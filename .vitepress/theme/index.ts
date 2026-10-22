import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import './style.css'

import RiskBadge from './components/RiskBadge.vue'
import AffiliateCard from './components/AffiliateCard.vue'
import GeoAnswerBox from './components/GeoAnswerBox.vue'
import DecisionTree from './components/DecisionTree.vue'
import TopicHiveTopology from './components/TopicHiveTopology.vue'
import AuthorByline from './components/AuthorByline.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(AuthorByline)
    })
  },
  enhanceApp({ app }) {
    app.component('RiskBadge', RiskBadge)
    app.component('AffiliateCard', AffiliateCard)
    app.component('GeoAnswerBox', GeoAnswerBox)
    app.component('DecisionTree', DecisionTree)
    app.component('TopicHiveTopology', TopicHiveTopology)
    app.component('AuthorByline', AuthorByline)
  }
} satisfies Theme
