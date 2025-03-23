import React from 'react'

const wapJSON = {
  "version": "7.0",
  "screens": [
    {
      "id": "DEMO_SCREEN",
      "title": "Demo Screen",
      "terminal": true,
      "layout": {
        "type": "SingleColumnLayout",
        "children": [
          {
            "type": "TextHeading",
            "text": "This is a heading",
            "visible": true
          },
          {
            "type": "TextSubheading",
            "text": "This is a subheading",
            "visible": true
          },
          {
            "type": "TextBody",
            "text": "This is body text"
          },
          {
            "type": "TextCaption",
            "text": "This is a text caption"
          },
          {
            "type": "Footer",
            "label": "Continue",
            "on-click-action": {
              "name": "complete",
              "payload": {}
            }
          }
        ]
      }
    }
  ]
}

const Preview = () => {
  return (
    <div className='w-1/4'>{JSON.stringify(wapJSON)}</div>
  )
}

export default Preview