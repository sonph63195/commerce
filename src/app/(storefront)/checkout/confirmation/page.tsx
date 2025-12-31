import Link from "next/link";

type Props = {
  searchParams?: { orderId?: string };
};

export default function ConfirmationPage({ searchParams }: Props) {
  const orderId = searchParams?.orderId;

  return (
    <div className="container max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Thank you — your order is placed!</h1>
      <p className="mb-4">We received your order{orderId ? ` (ID: ${orderId})` : ''} and will process it shortly.</p>

      <Link href="/" className="btn">Back to home</Link>
    </div>
  )
}
