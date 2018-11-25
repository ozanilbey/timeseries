import React from 'react'

class List extends React.Component {
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
      <section className="list">
        <img className="legend" src="/app/data/images/legend.png" />
        <ul className="labels">
          <li>
            Görünen Dalga Boyları
          </li>
          <li>
            Görünmeyen Dalga Boyları
            </li>
          <li>
            Bitki Gelişim Analizi
          </li>
          <li>
            Rapor
          </li>
        </ul>
        <ul
          className="collection">
          {Object.keys(item.dates).map((date, key) =>
            <li
              key={key}
              className="item">
              {['trueColor', 'falseColor', 'analyze']
                .map(type =>
                <div key={type}
                  className="preview"
                  style={{
                    backgroundImage: `url(${path}/${type}/${date}.png)`,
                    backgroundColor: type === 'analyze'
                      ? 'rgb(85, 85, 85)'
                      : 'rgb(0, 0, 0)',
                    borderColor: type === 'analyze'
                      ? 'rgb(85, 85, 85)'
                      : 'rgb(0, 0, 0)'
                  }}>
                </div>
              )}
              <div className="report">
                {item.dates[date].report.downloadable &&
                  <a href={`/app/data/reports/${item.province}-${item.district}-${item.neighborhood}-${item.lot}-${item.parcel}/${item.product}-${date}.pdf`} download={`${item.province}-${item.district}-${item.neighborhood}-${item.lot}-${item.parcel}-${item.product}-${date}`}>
                    <svg viewBox="0 0 28 40">
                      <path d="M6.75,19.402H5.415v1.991H6.75c0.536,0,0.96-0.472,0.96-0.968C7.709,19.866,7.286,19.402,6.75,19.402z"/>
                      <path d="M12.123,19.442h-1.327v3.582h1.327C14.282,23.024,14.377,19.442,12.123,19.442z"/>
                      <path d="M23,15H1c-0.55,0-1,0.45-1,1v10c0,0.55,0.45,1,1,1h22c0.551,0,1-0.45,1-1V16C24,15.45,23.551,15,23,15z M6.75,22.393 H5.415v1.056C5.415,23.801,5.191,24,4.903,24c-0.264,0-0.543-0.199-0.543-0.552v-4.501c0-0.264,0.208-0.553,0.543-0.553H6.75 c1.04,0,1.976,0.696,1.976,2.031C8.725,21.689,7.79,22.393,6.75,22.393z M12.195,24h-1.903c-0.264,0-0.552-0.145-0.552-0.496 v-4.541c0-0.288,0.288-0.496,0.552-0.496h1.831C15.777,18.467,15.697,24,12.195,24z M19.32,19.506h-2.328v1.271h2.039 c0.289,0,0.576,0.288,0.576,0.568c0,0.264-0.287,0.479-0.576,0.479h-2.039v1.679c0,0.28-0.199,0.496-0.479,0.496 c-0.352,0-0.568-0.216-0.568-0.496v-4.541c0-0.288,0.217-0.496,0.568-0.496h2.807c0.352,0,0.559,0.208,0.559,0.496 C19.879,19.219,19.672,19.506,19.32,19.506z"/>
                      <path d="M27,7.586L20.414,1C19.836,0.42,18.82,0,18,0H7C5.346,0,4,1.346,4,3v10c0,0.553,0.447,1,1,1s1-0.447,1-1V3 c0-0.551,0.448-1,1-1h9c1.105,0,2,0.896,2,2v3.75C18,8.988,19.014,10,20.25,10H24c1.105,0,2,0.896,2,2v17c0,0.551-0.447,1-1,1H7 c-0.552,0-1-0.449-1-1c0-0.553-0.447-1-1-1s-1,0.447-1,1c0,1.654,1.346,3,3,3h18c1.654,0,3-1.346,3-3V10 C28,9.181,27.58,8.165,27,7.586z"/>
                    </svg>
                    Raporu İndir
                  </a>
                }
                <pre className="text">{item.dates[date].report.text || ''}</pre>
              </div>
            </li>
          )}
        </ul>
      </section>
    )
  }
}

export default List