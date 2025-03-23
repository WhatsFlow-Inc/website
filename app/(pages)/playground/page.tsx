import Chat from './_components/Chat'
import Flow from './_components/Flow'
import Preview from './_components/Preview'

const page = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', display: "flex" }}><Chat /><Flow /><Preview /></div>
  )
}

export default page