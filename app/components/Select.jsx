import React from 'react'

const Select = (props) => (
  <ul className="select">
    {props.items.map((item, index) =>
      <li key={index} className="item">
        <a className="card" onClick={() =>
          props.setFilter(props.items[index])}>
          <div
            className="image"
            style={{backgroundImage: `url(
              /app/data/images/${item.province}-${item.district}-${item.neighborhood}-${item.lot}-${item.parcel}-${item.product}/trueColor/${item.dates[0]}.png
            )`}}>
          </div>
          <div className="caption">
            {item.label
              .replace(/ ➝ /g, ', ')
              .replace(/ *\([^)]*\) */g, "")
              .trim()}
            </div>
        </a>
      </li>
    )}
  </ul>
)

export default Select