import * as React from 'react'
import type { TLDrawState } from '~state'

export function useFileSystem() {
  const promptSaveBeforeChange = React.useCallback(async (tlstate: TLDrawState) => {
    if (tlstate.isDirty) {
      if (tlstate.fileSystemHandle) {
        if (window.confirm('Do you want to save changes to your current project?')) {
          await tlstate.saveProject()
        }
      } else {
        if (window.confirm('Do you want to save your current project?')) {
          await tlstate.saveProject()
        }
      }
    }
  }, [])

  const onNewProject = React.useCallback(
    async (tlstate: TLDrawState, e?: KeyboardEvent) => {
      if (e) e.preventDefault()
      await promptSaveBeforeChange(tlstate)
      tlstate.newProject()
    },
    [promptSaveBeforeChange]
  )

  const onSaveProject = React.useCallback((tlstate: TLDrawState, e?: KeyboardEvent) => {
    if (e) e.preventDefault()
    tlstate.saveProject()
  }, [])

  const onSaveProjectAs = React.useCallback((tlstate: TLDrawState, e?: KeyboardEvent) => {
    if (e) e.preventDefault()
    tlstate.saveProjectAs()
  }, [])

  const onOpenProject = React.useCallback(
    async (tlstate: TLDrawState, e?: KeyboardEvent) => {
      if (!tlstate) return
      if (e) e.preventDefault()
      await promptSaveBeforeChange(tlstate)
      tlstate.openProject()
    },
    [promptSaveBeforeChange]
  )

  return {
    onNewProject,
    onSaveProject,
    onSaveProjectAs,
    onOpenProject,
  }
}