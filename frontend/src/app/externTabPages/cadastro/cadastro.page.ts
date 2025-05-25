import { AuthService } from 'src/app/services/AuthService/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonContent, LoadingController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { userData } from 'src/app/models/types/user.types';
import { CadastroService } from 'src/app/services/cadastro/cadastro.service';
import { ApiEstadosService } from 'src/app/services/apiEstados/api-estados.service';
import zxcvbn from 'zxcvbn';
import { TextMaskModule } from 'angular2-text-mask';



type estado ={
  id:string,
  nome:string
}

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone:false
})
export class CadastroPage implements OnInit {

  @ViewChild('content', { static: false }) content!: IonContent;

  textoForca: string = 'Muito fraca';
  corForca: string = '';
  iconForca:string = '';

  listEstados:estado[] = []
  idMunicipio:string = ''
  listMunicipios:string[] = []

  // || <-- barra reta
  errorMenssage :String[] = []
  usuario:userData = {
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    sexo: '',
    estado_civil: '',
    data_de_nascimento: '',
    numero_de_telefone: '',
    estado: '',
    cidade: '',
    bairro: '',
  };

  ngOnInit(): void {
    this.apiEstados.getAllStates().subscribe({
      next: (estados: estado[]) => {
        this.listEstados = estados;
        console.log(estados)
        console.log(this.listEstados)
      },
      error: err => {
        console.error('Erro ao buscar estados:', err);
      }
    });
  }
  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private userService:CadastroService,
    private NavController:NavController,
    private apiEstados:ApiEstadosService
  ) {}

  onregister(){

    this.cheackInfo()

    if(this.errorMenssage.length == 0){
      // substituir por logica do back
    this.userService.setDados(this.usuario)
    this.NavController.navigateForward('/login')
    console.log(this.userService.getDados())
    }else{
      if (this.content) {
        this.content?.scrollToTop(500); // scroll suave para o topo
      } else {
        console.warn('IonContent ainda está indefinido');
      }
    }
  }

 /* async onCadastrar() {
    const loading = await this.loadingCtrl.create({ message: 'Cadastrando...' });
    await loading.present();

    this.authService.cadastrar(this.usuario).subscribe({
      next: async (res) => {
        await loading.dismiss();
        const alert = await this.alertCtrl.create({
          header: 'Sucesso',
          message: 'Usuário cadastrado com sucesso!',
          buttons: [{text:'OK',
            handler: () => {
              this.router.navigate(['/login']); // <-- redireciona para login
            }
          }]
        });
        await alert.present();

      },
      error: async (err) => {
        await loading.dismiss();
        const alert = await this.alertCtrl.create({
          header: 'Erro ao cadastrar',
          message: err.error.Message || 'Erro inesperado.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }
    */

  goToLogin(){
      this.NavController.navigateBack('/login')
  }

  cheackInfo(){

    this.errorMenssage = []
    // verifica nome
    if (this.usuario.nome.length == 0){
      this.errorMenssage.push("Campo 'Nome' faltando")
    }


    // verifica sobrenome
    if (this.usuario.sobrenome.length == 0){
      this.errorMenssage.push("campo 'Sobrenome' vazio")
    }
  

    // verifica email
    if (this.usuario.nome.length == 0){
       this.errorMenssage.push("Campo 'Email' vazio")
    }

    const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const testeEmail = padraoEmail.test(this.usuario.email)
    if (!testeEmail){
       this.errorMenssage.push('Adicione um email válido')
    }


    // verifica Sexo
    if (this.usuario.sexo.length == 0){
      this.errorMenssage.push("Campo 'Sexo' vazio")
    }

    // verifica Estado civil
    if (this.usuario.estado_civil.length == 0){
       this.errorMenssage.push("Campo 'Estado Civil' vazio")
    }

    // verifica Data de nascimento
    const ano = Number(this.usuario.data_de_nascimento.substring(6,this.usuario.data_de_nascimento.length-1));

    if (this.usuario.data_de_nascimento.length == 0){
      this.errorMenssage.push("Campo 'Data de nascimento' vazio")
    }else if (this.usuario.data_de_nascimento.length > 0 && ano>2007){
      this.errorMenssage.push("Você precisa ter mais de 18 anos para criar uma conta")
    }


     // verifica Telefone
    if (this.usuario.numero_de_telefone.length == 0){
       this.errorMenssage.push("Campo 'Telefone' vazio")
    }

    if (this.usuario.numero_de_telefone.length < 15){
      this.errorMenssage.push("Insira um número válido")
    }

    // verifica endereço
    if (this.usuario.estado.length == 0 || this.usuario.cidade.length == 0 || this.usuario.bairro.length == 0){
       this.errorMenssage.push("Faltam informações de endereço")
    }

    // verifica senha
    if (this.corForca === 'danger'){
       this.errorMenssage.push("Senha muito fraca")
    }


  }

  

  getIdForMunicipio(){
   const idEstado:string | undefined  = this.listEstados.find(estado=>estado.nome === this.usuario.estado)?.id

   this.apiEstados.getAllMunicipios(idEstado).subscribe({
    next: (municipios: string[]) => {
      this.listMunicipios = municipios;
      console.log(municipios)
      console.log(this.listMunicipios)
    },
    error: err => {
      console.error('Erro ao buscar municipios:', err);
    }
  });
  }

  verificarForcaSenha() {
    const resultado = zxcvbn(this.usuario.senha);
    const score = resultado.score; // 0 a 4
  
    const niveis = ['Muito fraca', 'Fraca', 'Razoável', 'Boa', 'Forte'];
    const cores = ['danger', 'danger', 'warning', 'success', 'success'];
    const icons = ['remove', 'remove', 'reorder-two', 'reorder-three', 'reorder-four'];
  
    this.textoForca = niveis[score];
    this.corForca = cores[score];
    this.iconForca = icons[score]
  }

  formatarTelefone(event: any) {
    let valor = event.detail.value.replace(/\D/g, '');
  
    if (valor.length > 11) {
      valor = valor.slice(0, 11);
    }
  
    if (valor.length <= 10) {
      this.usuario.numero_de_telefone = valor.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trim();
    } else {
      this.usuario.numero_de_telefone = valor.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').trim();
    }
  }
}