// 고마워요 포켓몬스터......

import { supabase } from '../../supabaseClient';

export async function addFavorite(userId, movie) {
  const { error } = await supabase
    .from('favorites')
    .insert({
      user_id: userId,
      movie_id: movie.id,
      movie_data: movie,
    });

  if (error) throw error;
}

export async function removeFavorite(userId, movieId) {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('movie_id', movieId);

  if (error) throw error;
}

export async function getFavorites(userId) {
  const { data, error } = await supabase
    .from('favorites')
    .select('movie_data')
    .eq('user_id', userId)
    .order('id', {ascending: false});   // id를 기준으로 최신에 추가한게 앞으로 가도록

  if (error) throw error;

  return data.map((d) => d.movie_data);
}
