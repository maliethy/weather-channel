import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import router from '@/router'
import store from '@/store'
import SignUp from '../index.vue'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(VueRouter)
localVue.use(Vuex)

describe('SignUp Form submit test', () => {
  let wrapper
  const VueFormStub = {
    render: () => {},
    methods: {
      validate: () => true,
    },
  }

  beforeEach(() => {
    wrapper = mount(SignUp, {
      localVue,
      router,
      store,
      attachTo: '#app > div',
      vuetify: new Vuetify(),
      stubs: {
        'v-form': VueFormStub,
      },
    })
  })

  test('SignUp에서 회원가입 버튼 클릭시\n email, nickname, password, passwordCheck, isAgreePrivateInfoUse 값이 각각 vuetify <v-text-field/> rules에 설정한 테스트를 통과해야한다.\n 모든 validation이 통과했을 때 user/signup action으로 email, nickname, password를 payload에 담아 dispatch한다.', async () => {
    try {
      store.dispatch = jest.fn()
      const event = { preventDefault: jest.fn() }

      wrapper.setData({
        email: 't@t.com',
        nickname: 'test',
        password: 'test',
        passwordCheck: 'test',
        isAgreePrivateInfoUse: true,
      })

      const submitBtn = wrapper.find('[type=submit]')
      submitBtn.vm.$emit('click', event)
      await wrapper.vm.$nextTick()

      expect(event.preventDefault).toHaveBeenCalled()

      expect(store.dispatch).toHaveBeenCalledWith('user/signup', {
        email: wrapper.vm.email,
        nickname: wrapper.vm.nickname,
        password: wrapper.vm.password,
      })
    } finally {
      wrapper.destroy()
    }
  })
})
