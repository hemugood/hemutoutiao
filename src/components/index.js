import LayoutAside from './home/layout-aside'
import LayoutHeader from './home/layout-header'
import BreadCrumb from './common/bread-crumb'
import { quillEditor } from 'vue-quill-editor'
import CoverImage from './publish/cover-image'
import SelectImage from './publish/select-image'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  install (Vue) {
    Vue.component('layout-aside', LayoutAside)
    Vue.component('layout-header', LayoutHeader)
    Vue.component('bread-crumb', BreadCrumb)
    Vue.component('quill-editor', quillEditor)
    Vue.component('cover-image', CoverImage)
    Vue.component('select-image', SelectImage)
  }
}
