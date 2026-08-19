import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'CharacterAnimator',

  schema: {
    character: ecs.eid,
    anim1: ecs.string,
    anim2: ecs.string,
  },

  schemaDefaults: {
    anim1: 'mixamo.com.001',
    anim2: 'mixamo.com',
  },

  data: {
    currentAnim: ecs.string,
  },

  stateMachine: ({world, eid, schemaAttribute, dataAttribute}) => {
    const {anim1, anim2} = schemaAttribute.get(eid)
    dataAttribute.set(eid, {
      currentAnim: anim1 || 'mixamo.com.001',
    })

    ecs
      .defineState('default')
      .initial()
      .listen(eid, ecs.input.UI_CLICK, () => {
        const state = dataAttribute.get(eid)
        const schema = schemaAttribute.get(eid)
        const a1 = schema.anim1 || 'mixamo.com.001'
        const a2 = schema.anim2 || 'mixamo.com'
        const nextAnim = state.currentAnim === a1 ? a2 : a1

        dataAttribute.mutate(eid, (cursor) => {
          cursor.currentAnim = nextAnim
        })

        const targetEid = schema.character || eid
        ecs.GltfModel.mutate(world, targetEid, (model) => {
          model.animationClip = nextAnim
          model.loop = true
          return false
        })
        console.log('[CharacterAnimator] Switched animation to:', nextAnim)
      })
  },

  add: (world, component) => {
    const handleToggle = () => {
      const current = component.data.currentAnim || component.schema.anim1 || 'mixamo.com.001'
      const a1 = component.schema.anim1 || 'mixamo.com.001'
      const a2 = component.schema.anim2 || 'mixamo.com'
      const nextAnim = current === a1 ? a2 : a1

      component.data.currentAnim = nextAnim
      const targetEid = component.schema.character || component.eid
      ecs.GltfModel.mutate(world, targetEid, (model) => {
        model.animationClip = nextAnim
        model.loop = true
        return false
      })
      console.log('[CharacterAnimator] Toggled animation to:', nextAnim)
    }

    world.events.addListener(component.eid, ecs.input.UI_CLICK, handleToggle)

    world.events.addListener(world.events.globalId, ecs.input.SCREEN_TOUCH_START, (e) => {
      if (e.target === component.eid || (component.schema.character && e.target === component.schema.character)) {
        handleToggle()
      }
    })
  },
})
