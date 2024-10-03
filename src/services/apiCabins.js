import { supabase, supabaseUrl } from "./supabase";

export const getCabins = async () => {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) throw new Error("cabins could not be loaded");

  return cabins;
};

export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error("cabins could not be deleted");
  return data;
};

export const createEditCabin = async (newCabin, id) => {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]).select();
  }
  if (id) {
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  }

  const { data, error } = await query.select().single();

  if (error) throw new Error("cabins could not be created");

  if (hasImagePath) return data;

  const { error: imageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (imageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("cabins image could not be uploaded");
  }

  return data;
};
