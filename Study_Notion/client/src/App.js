import './App.css';
// import CodeBlocks from './componets/CodeBlocks';
import NavBar from './componets/common/Navbar';
function App() {
  return (
    <div className="App bg-success">
      <div className='bg-danger'>
        <NavBar></NavBar>
      </div>
      {/* <div className='text-animation '>
        <CodeBlocks 
       codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
       ></CodeBlocks>
      </div> */}
    </div>
  );
}

export default App;
