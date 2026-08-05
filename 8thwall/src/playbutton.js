import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'PlayPauseButton',

  schema: {
    button: ecs.eid,      // El botón UI (Play)
    videoPlane: ecs.eid,  // El Plane que contiene el Video Controls
    textEntity: ecs.eid,  // El hijo Text del botón
  },

  data: {
    playing: ecs.boolean,
  },

  stateMachine: ({world, eid, schemaAttribute, dataAttribute}) => {
    dataAttribute.set(eid, {
      playing: true, // Como Autoplay está activado
    })

    ecs
      .defineState('default')
      .initial()

      .listen(
        schemaAttribute.get(eid).button,
        ecs.input.UI_CLICK,
        () => {
          const state = dataAttribute.get(eid)
          const {videoPlane, textEntity} = schemaAttribute.get(eid)

          dataAttribute.mutate(eid, (cursor) => {
            cursor.playing = !cursor.playing
          })

          ecs.VideoControls.mutate(world, videoPlane, (video) => {
            video.paused = !state.playing
            return false
          })

          ecs.Ui.mutate(world, textEntity, (ui) => {
            ui.text = state.playing ? 'Play' : 'Pause'
            return false
          })
        }
      )
  },
})