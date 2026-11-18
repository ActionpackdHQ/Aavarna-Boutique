import { contact, hours } from "@/lib/data";

const policies = [
  { label: "50% advance on order", href: "#cta" },
  { label: "No refunds — restitch options", href: "#cta" },
  { label: "Free alterations", href: "#cta" },
  { label: "Unlimited free trials", href: "#cta" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#c9a35c]/15 bg-[#0a0908] px-5 py-16 md:px-10 md:py-20">
      <div className="mx-auto grid max-w-[1600px] gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <a
            href="#top"
            className="display text-xl tracking-[0.15em] text-ivory md:text-2xl"
          >
            {contact.brand}
          </a>
          <p className="mt-4 max-w-xs text-base leading-relaxed text-ivory/55">
            {contact.tagline}. Bring your fabric — we stitch to measure.
          </p>
        </div>

        <div>
          <p className="label mb-4 text-gold">Visit</p>
          <address className="not-italic text-base leading-relaxed text-ivory/70">
            <p>{contact.address}</p>
            <p>{contact.city}</p>
            {contact.maps ? (
              <a
                href={contact.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-gold transition hover:text-ivory"
              >
                Open in Google Maps
              </a>
            ) : null}
            <a
              href={contact.phoneHref}
              className="mt-4 block transition hover:text-gold"
            >
              {contact.phone}
            </a>
            {contact.phoneSecondary ? (
              <a
                href={contact.phoneSecondaryHref}
                className="mt-1 block transition hover:text-gold"
              >
                {contact.phoneSecondary}
              </a>
            ) : null}
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block transition hover:text-gold"
            >
              WhatsApp
            </a>
          </address>
          <div className="mt-6 space-y-1 text-base text-ivory/50">
            {hours.map((h) => (
              <p key={h.days}>
                <span className="text-ivory/70">{h.days}:</span> {h.time}
              </p>
            ))}
          </div>
        </div>

        <div>
          <p className="label mb-4 text-gold">Studio Policy</p>
          <ul className="space-y-2">
            {policies.map((p) => (
              <li key={p.label}>
                <a
                  href={p.href}
                  className="text-base text-ivory/70 transition hover:text-gold"
                >
                  {p.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label mb-4 text-gold">Connect</p>
          <ul className="space-y-2">
            {contact.socials.instagram ? (
              <li>
                <a
                  href={contact.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label text-ivory/70 transition hover:text-gold"
                >
                  Instagram
                </a>
              </li>
            ) : null}
            <li>
              <a
                href={contact.calendar}
                target="_blank"
                rel="noopener noreferrer"
                className="label text-ivory/70 transition hover:text-gold"
              >
                Book consultation
              </a>
            </li>
            <li>
              <a
                href="/assistant"
                className="label text-ivory/70 transition hover:text-gold"
              >
                Ask assistant
              </a>
            </li>
          </ul>
          <p className="label mb-3 mt-8 text-gold">Payments</p>
          <p className="text-base text-ivory/70">{contact.upiName}</p>
          {contact.upiId ? (
            <p className="mt-1 break-all text-sm text-ivory/50">{contact.upiId}</p>
          ) : (
            <p className="mt-1 text-sm text-ivory/50">
              UPI &amp; other methods — team confirms on WhatsApp.
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1600px] flex-col items-start justify-between gap-4 border-t border-ivory/10 pt-8 sm:flex-row sm:items-center">
        <p className="text-sm text-ivory/45">
          © {new Date().getFullYear()} {contact.brand}. All rights reserved.
        </p>
        <p className="label text-ivory/30">Chennai</p>
      </div>
    </footer>
  );
}
