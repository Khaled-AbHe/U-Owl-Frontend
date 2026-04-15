export default function AuthForm({
  title,
  subtitle,
  children,
  onSubmit,
  footer,
}: any) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={onSubmit}
        className="flex w-full max-w-md flex-col gap-5 rounded-2xl bg-white p-8 shadow-xl"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl text-white">
            👤
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>

        {children}

        <button
          type="submit"
          className="rounded-xl bg-blue-600 py-2 font-semibold text-white transition hover:opacity-90"
        >
          {title}
        </button>

        <div className="flex items-center gap-3 text-sm text-gray-400">
          <div className="h-px flex-1 bg-gray-300" />
          or
          <div className="h-px flex-1 bg-gray-300" />
        </div>

        {footer}
      </form>
    </div>
  );
}
