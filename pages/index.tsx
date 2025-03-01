import Link from 'next/link'
import '../styles/globals.css';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Welcome to Streaks App</h1>
      <p className="mt-4 text-lg">Choose a case to view the streak</p>
      <div className="mt-8">
      <Link href="/streaks/1">
        <button className="mx-2 px-4 py-2 text-lg bg-green-300 text-white rounded hover:bg-green-500">Case 1</button>
      </Link>
      <Link href="/streaks/2">
        <button className="mx-2 px-4 py-2 text-lg bg-green-300 text-white rounded hover:bg-green-500">Case 2</button>
      </Link>
      <Link href="/streaks/3">
        <button className="mx-2 px-4 py-2 text-lg bg-green-300 text-white rounded hover:bg-green-500">Case 3</button>
      </Link>
      </div>
    </div>
  )
}

export default Home
