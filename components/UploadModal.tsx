"use client";


import useUploadModal from '@/hooks/useUploadModal'
import Modal from './Modal'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';


const UploadModal = () => {
    const UploadModal = useUploadModal();
    const { 
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            author: "",
            title: "",
            song: null,
            image:null,
        }
    });
    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            UploadModal.onClose();
        }
    }

    const onSubmit:SubmitHandler<FieldValues> = async (values) => {

    }

  return (
    <Modal
      title="Add a Song"
      description="Upload an MP3 file ( ghir mp3 ) ⛔"
      isOpen={UploadModal.isOpen}
      onChange={onChange}
    >
          <form onSubmit={handleSubmit(onSubmit)}>
              
      </form>
    </Modal>
  );
}

export default UploadModal