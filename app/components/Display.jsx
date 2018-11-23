import React from 'react'

class Display extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 0,
      total: this.props.filter.dates.length - 1
    }
    this.changeActive = this.changeActive.bind(this)
  }
  changeActive(event) {
    this.setState({
      active: event.target.value
    })
  }
  render() {
    let item = this.props.filter
    let path = `/app/data/images/${item.province}-${item.district}-${item.neighborhood}-${item.lot}-${item.parcel}-${item.product}`
    let {active, total} = this.state
    return(
      <section className="display">
        <ul
          className="collection"
          style={{
            backgroundColor: item.type === 'analyze'
              ? 'rgb(85, 85, 85)'
              : 'rgb(0, 0, 0)'
          }}>
          {item.dates.map((date, key) =>
            <li
              key={key}
              className="item"
              style={{
                display: active == key ? 'block' : 'none',
                backgroundImage: `url(${path}/${item.type}/${date}.png)`
              }}>
              <div
                className="preview"
                style={{
                  backgroundImage: `url(${path}/trueColor/${date}.png)`
                }}
                onClick={() =>
                  this.props.setFilter(
                    item.type === 'analyze'
                    ? 'falseColor'
                    : 'analyze')
                }>
                <svg
                  className={
                    item.type === 'analyze'
                    ? ''
                    : 'turned'
                  }
                  viewBox="18 22 64 56">
                  <path d="M18.874,52.751h4.345c0.442,0,0.805,0.333,0.858,0.771c0.732,6,3.404,11.582,7.718,15.898 c5.155,5.132,11.982,7.986,19.233,7.986c6.953,0.05,13.518-2.537,18.582-7.295c0.357-0.335,0.357-0.908,0.01-1.254l-6.817-6.817 c-3.114,3.121-7.316,4.863-11.775,4.863c-4.426,0-8.582-1.782-11.762-4.931c-2.261-2.261-3.756-5.105-4.386-8.164 c-0.109-0.53,0.318-1.021,0.859-1.021h3.686c0.776,0,1.166-0.938,0.618-1.488L29.785,41.006c-0.34-0.341-0.892-0.342-1.233-0.002 L18.258,51.261C17.707,51.81,18.096,52.751,18.874,52.751z"/>
                  <path d="M49.837,22.621c-6.487,0.344-12.529,3.044-17.055,7.711c-0.341,0.352-0.312,0.924,0.051,1.253l6.05,5.475 c0.348,0.315,0.873,0.287,1.207-0.043c2.752-2.719,6.325-4.299,10.258-4.506c7.853-0.352,14.619,5.177,16.013,12.705 c0.094,0.51-0.305,0.981-0.823,1.004l-3.435,0.158c-0.777,0.036-1.122,0.993-0.547,1.516l9.955,9.055 c0.357,0.325,0.909,0.298,1.233-0.06l9.027-9.965c0.521-0.575,0.088-1.494-0.688-1.457l-4.612,0.219 C75.178,32.22,63.503,21.989,49.837,22.621z"/>
                </svg>
              </div>
            </li>
          )}
        </ul>
        <div className="action">
          <input className="slider" type="range" min={0} max={total} step={1} value={active} onChange={this.changeActive} />
          <div className="date">
            <b style={{left: `calc(100% / ${total} * ${active})`}}>{item.dates[active]}</b>
          </div>
        </div>
      </section>
    )
  }
}

export default Display