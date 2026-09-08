import WeddingInvitation from "../components/WeddingInvitation";
import { getNumberedUploadImages } from "../lib/uploadImages";

export const dynamic = "force-dynamic";

export default async function Home() {
  const slides = await getNumberedUploadImages();

  return <WeddingInvitation slides={slides} />;
}
