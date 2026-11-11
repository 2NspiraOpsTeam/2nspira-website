import { permanentRedirect } from "next/navigation";

export default function RetiredService() {
  permanentRedirect("/services");
}
