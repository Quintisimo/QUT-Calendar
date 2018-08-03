import { app, BrowserWindow } from 'electron'
import path from 'path'

app.on('ready', () => {
  const browserWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'loadJquery.js')
    },
    height: 600,
    width: 1000
  })

  browserWindow.loadURL('https://secure.qut.edu.au/login/')

  browserWindow.webContents.on('did-finish-load', () => {
    if (
      browserWindow.webContents.getURL() ===
      'https://qutvirtual4.qut.edu.au/group/student/home'
    ) {
      browserWindow.loadURL(
        'https://qutvirtual4.qut.edu.au/group/student/calendar'
      )
      browserWindow.webContents.executeJavaScript(`
        $('body')
        .children()
        .each((i, element) => {
          if ($(element).attr('id') !== 'wrapper-container') {
            $(element).remove()
          } else {
            $(element).css({ backgroundColor: 'white', paddingTop: '30px' })
            $(element)
              .children()
              .each((i, element) => {
                if ($(element).attr('id') !== 'wrapper') {
                  $(element).remove()
                } else {
                  $(element)
                    .children()
                    .each((i, element) => {
                      if ($(element).attr('id') !== 'content-wrapper') {
                        $(element).remove()
                      } else {
                        $('#qut-landingPage > div:nth-child(3)').remove()
                        $('#qut-landingPage > h1').remove()
                      }
                    })
                }
              })
          }
        })
      `)
    }
  })
})
