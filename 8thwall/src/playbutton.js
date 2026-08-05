import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'PlayPauseButton',

  schema: {
    videoPlane: ecs.eid,
    textEntity: ecs.eid,
  },

  data: {
    isPlaying: false,
  },

  stateMachine: ({world, eid, schemaAttribute}) => {
    return ecs.defineState('default')
      .initial()

      .listen(eid, ecs.ui.CLICK, () => {

        const data = ecs.PlayPauseButton.get(world, eid)
        const {videoPlane, textEntity} = schemaAttribute.get(eid)

        data.isPlaying = !data.isPlaying

        ecs.PlayPauseButton.set(world, eid, data)

        ecs.VideoControls.mutate(world, videoPlane, (video) => {
          video.paused = !data.isPlaying
          return false
        })

        ecs.UiText.set(world, textEntity, {
          text: data.isPlaying ? 'Pause' : 'Play'
        })
      })
  }
})