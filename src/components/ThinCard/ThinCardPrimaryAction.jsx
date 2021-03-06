import React from 'react'
import Flexbox from 'flexbox-react'

const ThinCardPrimaryAction = (props) => {
  return (
    <Flexbox alignItems='center' className={`thincard__primary_action ${props.className}`} style={props.style}>
      {props.children}
    </Flexbox>
  )
}

ThinCardPrimaryAction.defaultProps = {
  style: {},
  className: {}
}

ThinCardPrimaryAction.propTypes = {
  style: React.PropTypes.object,
  className: React.PropTypes.object
}

export default ThinCardPrimaryAction
