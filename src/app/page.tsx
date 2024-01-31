export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img
            className="max-w-screen-md max-h-96"
            src="https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg"
            alt="Background"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Technical Test - Habitanto</h2>
          <p>FullStack DEVELOPER Position</p>
          <p>by Christian David Mora Diaz</p>
        </div>
      </div>
    </main>
  );
}
