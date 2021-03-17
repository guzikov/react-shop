import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap-v5'
import HomeScreen from './components/HomeScreen'
import ProductScreen from './components/ProductScreen'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact></Route>
          <Route path='/product/:id' component={ProductScreen}></Route>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
