export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="flex items-center justify-between border-t border-[var(--dark-border)] bg-[var(--dark)] px-12 py-7">
      <span className="font-serif text-[0.95rem] italic text-[var(--text-muted)]">
        decayla anthony
      </span>
      <span className="font-sans text-[0.7rem] tracking-[0.06em] text-[var(--text-muted)]">
        © {year}
      </span>
    </footer>
  );
}
