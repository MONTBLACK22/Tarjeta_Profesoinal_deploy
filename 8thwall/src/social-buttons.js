import * as ecs from '@8thwall/ecs'

const WHATSAPP_URL = 'https://wa.me/573043980906'
const INSTAGRAM_URL = 'https://www.instagram.com/jt.__.22/?utm_source=ig_web_button_share_sheet'
const YOUTUBE_URL = 'https://youtube.com/@chilleitor?si=J3LpZuGt3LiccguO'

function openSafeUrl(url) {
  if (!url) return
  try {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = url
    }
  } catch (e) {
    window.location.href = url
  }
}


ecs.registerComponent({
  name: 'WhatsAppButton',
  schema: {
    url: ecs.string,
  },
  schemaDefaults: {
    url: WHATSAPP_URL,
  },
  stateMachine: ({world, eid, schemaAttribute}) => {
    ecs
      .defineState('default')
      .initial()
      .listen(eid, ecs.input.UI_CLICK, () => {
        const schema = schemaAttribute.get(eid)
        const targetUrl = (schema && schema.url) ? schema.url : WHATSAPP_URL
        console.log('[WhatsAppButton] UI_CLICK ->', targetUrl)
        openSafeUrl(targetUrl)
      })
  },
  add: (world, component) => {

    world.events.addListener(component.eid, ecs.input.UI_CLICK, () => {
      const targetUrl = component.schema.url || WHATSAPP_URL
      console.log('[WhatsAppButton] world.events UI_CLICK ->', targetUrl)
      openSafeUrl(targetUrl)
    })

    world.events.addListener(world.events.globalId, ecs.input.SCREEN_TOUCH_START, (e) => {
      if (e.target === component.eid) {
        const targetUrl = component.schema.url || WHATSAPP_URL
        console.log('[WhatsAppButton] SCREEN_TOUCH_START ->', targetUrl)
        openSafeUrl(targetUrl)
      }
    })
  },
})


ecs.registerComponent({
  name: 'InstagramButton',
  schema: {
    url: ecs.string,
  },
  schemaDefaults: {
    url: INSTAGRAM_URL,
  },
  stateMachine: ({world, eid, schemaAttribute}) => {
    ecs
      .defineState('default')
      .initial()
      .listen(eid, ecs.input.UI_CLICK, () => {
        const schema = schemaAttribute.get(eid)
        const targetUrl = (schema && schema.url) ? schema.url : INSTAGRAM_URL
        console.log('[InstagramButton] UI_CLICK ->', targetUrl)
        openSafeUrl(targetUrl)
      })
  },
  add: (world, component) => {
 
    world.events.addListener(component.eid, ecs.input.UI_CLICK, () => {
      const targetUrl = component.schema.url || INSTAGRAM_URL
      console.log('[InstagramButton] world.events UI_CLICK ->', targetUrl)
      openSafeUrl(targetUrl)
    })

    world.events.addListener(world.events.globalId, ecs.input.SCREEN_TOUCH_START, (e) => {
      if (e.target === component.eid) {
        const targetUrl = component.schema.url || INSTAGRAM_URL
        console.log('[InstagramButton] SCREEN_TOUCH_START ->', targetUrl)
        openSafeUrl(targetUrl)
      }
    })
  },
})


ecs.registerComponent({
  name: 'YouTubeButton',
  schema: {
    url: ecs.string,
  },
  schemaDefaults: {
    url: YOUTUBE_URL,
  },
  stateMachine: ({world, eid, schemaAttribute}) => {
    ecs
      .defineState('default')
      .initial()
      .listen(eid, ecs.input.UI_CLICK, () => {
        const schema = schemaAttribute.get(eid)
        const targetUrl = (schema && schema.url) ? schema.url : YOUTUBE_URL
        console.log('[YouTubeButton] UI_CLICK ->', targetUrl)
        openSafeUrl(targetUrl)
      })
  },
  add: (world, component) => {

    world.events.addListener(component.eid, ecs.input.UI_CLICK, () => {
      const targetUrl = component.schema.url || YOUTUBE_URL
      console.log('[YouTubeButton] world.events UI_CLICK ->', targetUrl)
      openSafeUrl(targetUrl)
    })

    world.events.addListener(world.events.globalId, ecs.input.SCREEN_TOUCH_START, (e) => {
      if (e.target === component.eid) {
        const targetUrl = component.schema.url || YOUTUBE_URL
        console.log('[YouTubeButton] SCREEN_TOUCH_START ->', targetUrl)
        openSafeUrl(targetUrl)
      }
    })
  },
})


ecs.registerComponent({
  name: 'LinkButton',
  schema: {
    url: ecs.string,
  },
  schemaDefaults: {
    url: '',
  },
  stateMachine: ({world, eid, schemaAttribute}) => {
    ecs
      .defineState('default')
      .initial()
      .listen(eid, ecs.input.UI_CLICK, () => {
        const schema = schemaAttribute.get(eid)
        if (schema && schema.url) {
          openSafeUrl(schema.url)
        }
      })
  },
  add: (world, component) => {
    world.events.addListener(component.eid, ecs.input.UI_CLICK, () => {
      if (component.schema.url) {
        openSafeUrl(component.schema.url)
      }
    })
  },
})
