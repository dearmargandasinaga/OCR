import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <h1>OCR EPS - Smart Shipping Label Scanner</h1>
      <nav>
        <Link href="/scanner">
          <a>Scanner Label</a>
        </Link>
        <Link href="/manifest-outgoing">
          <a>Manifest Out Going Final</a>
        </Link>
      </nav>
    </div>
  );
}