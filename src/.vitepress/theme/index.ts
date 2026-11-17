import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import { h } from 'vue';
import './style.css';

import Breadcrumb from './components/Breadcrumb.vue';
import AffButton from './components/AffButton.vue';
import AffiliateCallout from './components/AffiliateCallout.vue';
import BrandCard from './components/BrandCard.vue';
import BrandDatabase from './components/BrandDatabase.vue';
import BrandInfrastructureSnapshot from './components/BrandInfrastructureSnapshot.vue';
import NetworkPerformanceReport from './components/NetworkPerformanceReport.vue';
import StreamingAvailabilityMatrix from './components/StreamingAvailabilityMatrix.vue';
import NetworkTopology from './components/NetworkTopology.vue';
import HomeHero from './components/HomeHero.vue';
import HomeFeatures from './components/HomeFeatures.vue';
import SiteFooter from './components/SiteFooter.vue';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(SiteFooter)
    });
  },
  enhanceApp({ app }) {
    app.component('Breadcrumb', Breadcrumb);
    app.component('AffButton', AffButton);
    app.component('AffiliateCallout', AffiliateCallout);
    app.component('BrandCard', BrandCard);
    app.component('BrandDatabase', BrandDatabase);
    app.component('BrandInfrastructureSnapshot', BrandInfrastructureSnapshot);
    app.component('NetworkPerformanceReport', NetworkPerformanceReport);
    app.component('StreamingAvailabilityMatrix', StreamingAvailabilityMatrix);
    app.component('NetworkTopology', NetworkTopology);
    app.component('HomeHero', HomeHero);
    app.component('HomeFeatures', HomeFeatures);
    app.component('SiteFooter', SiteFooter);
  }
} satisfies Theme;
