export async function GET() {
  const profil = {
    nama: "Izar",
    pendidikan: "Sistem dan Teknologi Informasi ITB",
    skills: ["Java", "Python", "SQL"],
  };

  return Response.json(profil);
}
