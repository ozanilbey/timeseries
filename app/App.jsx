import React from 'react'
import {render} from 'react-dom'

import Main from './containers/Main'
import Navigation from './containers/Navigation'

import Indicator from '~/components/Indicator'
import Select from '~/components/Select'
import Display from '~/components/Display'
import Loader from '~/components/Loader'

import items from '~/data/list.json'

import '~/styles/common.less'

const views = [
  {
    view: 'start',
    title: 'Agrovisio Time Series yükleniyor!',
    back: false
  },
  {
    view: 'select',
    title: 'Lütfen bir bölge seçin',
    back: false
  },
  {
    view: 'display',
    title: 'Sonuçlar görüntüleniyor',
    back: true
  }
]

class App extends React.Component {
  constructor(props) {
    super()
    this.state = {
      ...views[0],
      filter: {
        type: 'analyze'
      }
    }
    this.setView = this.setView.bind(this)
    this.setFilter = this.setFilter.bind(this)
    this.goBack = this.goBack.bind(this)
  }
  componentWillMount() {
    this.setView('start')
  }
  componentDidMount() {
    setTimeout(
      () => this.setView('select'),
      2500
    )
  }
  setView(name) {
    this.setState({
      ...views.filter(
        item => item.view === name
      )[0],
      previous: this.state.view === name
      ? this.state.previous
      : this.state.view
    })
  }
  setFilter({target, type}) {
    target = target || this.state.filter,
    type = type || this.state.filter.type
    this.setState({
      filter: {
        ...target,
        type
      }
    })
    this.setView('display')
    target && this.setState({
      title: target.label
    })
  }
  goBack() {
    this.setView(
      this.state.previous
    )
  }
  render() {
    let {view, title, filter, back, previous} = this.state
    let {setFilter, goBack} = this
    let content = function() {
      switch(view) {
        case 'select':
          return (
            <Select
              items={items}
              setFilter={target =>
                setFilter({target: target})
              } />
          )
          break
        case 'display':
          return (
            <Display
              items={items}
              filter={filter}
              setFilter={type =>
                setFilter({type: type})
              } />
          )
          break
        default:
          return <Loader />
          break
      }
    }()
    return (
      <div id={view || 'loading'} className="app">
        <Navigation>
          <Indicator
            title={title}
            back={back}
            goBack={() => goBack()} />
        </Navigation>
        <Main>
          {content}
        </Main>
      </div>
    )
  }
}

render(
  <App/>,
  document.getElementById('root')
)