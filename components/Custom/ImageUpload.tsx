"use client"
import { useState } from "react";
import React from "react";

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState(null);
  const [loading, setLoading] = useState(false);
  const [outputImage, setOutputImage] = useState(null);
  const inputRef = React.useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/main/interrogate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: selectedImage }),
      });
      const data = await response.json();
      setCaption(data.caption);
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/main/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: caption, image: selectedImage }),
      });
      const data = await response.json();

      setOutputImage(data.source);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleChat = async () => {
    const modifications = inputRef.current.value;

    const messages = [{
      role: "system",
      content: `You are a helpful assistant that is an expert in image generation. You will be given a prompt that is going to be fed into an img2img model.
      If the user asks you to change the image in any way, you will respond with the new prompt.
      Do not include any other text in your response, only the new prompt.`
    }, {
      role: "user",
      content: `Current prompt: ${caption}. Modifications: ${modifications}`
    }];

    const response = await fetch('/api/main/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: messages }),
    });

    const data = await response.json();
    setCaption(data.response);
  }


  return (
    <div className="w-full h-full bg-green-500">
      <></>
    </div>
  );
}

export default ImageUpload;