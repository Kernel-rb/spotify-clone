import {  useEffect, useMemo, useState } from 'react';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { Song } from '@/types';
// import toast from 'react-hot-toast';



const useGetSongById = (id?: string) => {
    const [isLoading, setIsloading] = useState(false);
    const [song, setSong] = useState<Song | undefined>(undefined);
    const { supabaseClient } = useSessionContext();

    useEffect(() => {
        const fetchSong = async () => {
            const { data, error } = await supabaseClient
                .from("songs")
                .select("*")
                .eq("id", id)
                .single();
            if (error) {
                setIsloading(false);
                 console.log(error.message);
            }
            setSong(data as Song);
            setIsloading(false);
        }
        fetchSong();
    }, [id, supabaseClient])
    
    return useMemo(() => ({
        isLoading,
        song
    }), [isLoading, song])
}

export default useGetSongById;