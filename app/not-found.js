import NotFoundView from "@/components/NotFoundView";

export const metadata = {
  title: "Página no encontrada",
  alternates: { canonical: null },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundView />;
}
