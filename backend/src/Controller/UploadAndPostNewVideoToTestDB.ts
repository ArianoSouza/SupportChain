
import { Request, Response } from "express";
 import testDbConnection from "../dataTest/connectionTestServer";
 import { Video } from "../models/Types"; // Assuming Video type is defined in Types.ts
import cloudinary from "../services/cloudnary";
import connection from "../data/connection";

 export default async function PostNewVideoOnProduction(
  req: Request,
  res: Response
 ): Promise<void> {
  try {
  // Validate request body
  const { title, description, tags } = req.body;
  if (!title || !description || !tags || !Array.isArray(tags)) {
    if (!Array.isArray(tags)){
      res.status(422).json({ message: "not a array" });
    }
  res.status(422).json({ message: "Missing required fields: title, description, or tags (should be an array)." });
  return;
  }

  // Validate files
  if (!req.files || !('videoFile' in req.files) || !('thumbnailFile' in req.files)) {
  res.status(422).json({ message: "Video file and thumbnail file are required." });
  return;
  }

  const videoFile = (req.files as any).videoFile[0];
  const thumbnailFile = (req.files as any).thumbnailFile[0];

  // Upload video to Cloudinary
  const videoUploadResult = await cloudinary.uploader.upload(videoFile.path, {
  resource_type: "video",
  folder: "videos" // Optional: specify a folder in Cloudinary
  });

  // Upload thumbnail to Cloudinary
  const thumbnailUploadResult = await cloudinary.uploader.upload(thumbnailFile.path, {
  resource_type: "image",
  folder: "thumbnails" // Optional: specify a folder in Cloudinary
  });

  // Generate unique ID for the video
  const countResult = await connection('videos').count('id as count').first();
  const count = countResult ? parseInt(countResult.count as string, 10) : 0;
  const newVideoId: string = `video_${count + 1}`;

  // Prepare video data for insertion
  const newVideo: Video = {
  id: newVideoId,
  title: title,
  description: description,
  tags: tags,
  likes: [], // Initialize with empty likes array
  tumbURL: thumbnailUploadResult.secure_url,
  URL: videoUploadResult.secure_url,
  };

  // Insert video information into the database
  await connection("videos").insert(newVideo);

  res.status(201).json({ message: "Video added successfully!", video: newVideo });

  } catch (error: any) {
  console.error("Error adding new video:", error);
  res.status(500).json({ message: "Internal server error when adding video", error: error.message });
  }
 }

 /*

 Example Request Body (assuming you're using a middleware like 'multer' for file uploads):

  {
    "title": "My Awesome Video",
    "description": "This is a description of my awesome video.",
    "tags": ["programming", "tutorial", "javascript"]
  }

 And two files attached to the request:
  - 'videoFile': the actual video file
  - 'thumbnailFile': the thumbnail image file

 */