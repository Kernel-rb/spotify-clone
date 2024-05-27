import useUploadModal from "@/hooks/useUploadModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

// Function to sanitize the title
const sanitizeTitle = (title: string) => {
  return title.replace(/[^a-zA-Z0-9-_]/g, "");
};

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const UploadModal = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });
  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      UploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error("Please fill all the fields");
        return;
      }

      const sanitizedTitle = sanitizeTitle(values.title);
      const uniqueID = uniqid();
      // upload song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${sanitizedTitle}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        console.log(`Error while uploading the song ${songError}`);
        console.log(songError);
        return toast.error("Error while uploading the song");
      }

      // upload image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${sanitizedTitle}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });
      if (imageError) {
        setIsLoading(false);
        console.log(imageError);
        return toast.error("Error while uploading the image");
      }

      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });
      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }
      router.refresh();
      setIsLoading(false);
      toast.success("Song uploaded successfully");
      reset();
      UploadModal.onClose();
    } catch (error) {
      toast.error("Error while uploading the song");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add a Song"
      description="Upload an MP3 file ( ghir mp3 ) ⛔"
      isOpen={UploadModal.isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
            flex
            flex-col
            gap-y-4
      "
      >
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: "Title is required" })}
          placeholder="Song Title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: "author is required" })}
          placeholder="Song author"
        />
        <div>
          <div className="pb-1">Select a Song file *.mp3</div>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register("song", { required: "song is required" })}
          />
        </div>
        <div>
          <div className="pb-1">Select an image</div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register("image", { required: "image is required" })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
