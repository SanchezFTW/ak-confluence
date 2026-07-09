import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '3gzdej0i',
    dataset: 'production',
  },
  // Hostname for the deployed studio -> https://akconfluence.sanity.studio
  studioHost: 'akconfluence',
  deployment: {autoUpdates: true, appId: 'xbv10uihp0vmipmt7w20sv01'},
})
