import WeddingInvitation from "../../components/WeddingInvitation";
import { getNumberedUploadImages } from "../../lib/uploadImages";

export const dynamic = "force-dynamic";

export default async function InvitationCodePage({
  params,
}: {
  params: Promise<{ invitationCode: string }>;
}) {
  const { invitationCode } = await params;
  const slides = await getNumberedUploadImages();

  return (
    <WeddingInvitation invitationCode={invitationCode} slides={slides} />
  );
}
