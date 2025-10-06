import { useState } from 'react'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <div className="min-h-screen bg-background text-gray-100">
      <header className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Coursebook Revision App</h1>
      </header>
      <main className="p-4">
        {/* Source Selector + PDF Viewer will go here */}
      </main>
    </div>
    </>
  )
}

export default App
