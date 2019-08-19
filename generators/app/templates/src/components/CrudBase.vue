<script>
import {HTTP} from '@/http'

export default {
  filters: {
    dateFmt(date) {
      if (date)
        return date.split('T')[0]
      return date
    }
  },
  methods: {
    update: function(instance) {
      console.log('update')
      this._put(`/user/${instance.id}`, instance)
    },
    save: function (instance) {
      this._post('/user', instance, res => this.userList.push(res.data))
    },
    _post(url, instance, callback) {
      this._request(url, 'post', instance, callback)
    },
    _put(url, instance, callback) {
      console.log('_put')
      this._request(url, 'put', instance, callback)
    },
    _request(url, method, instance, callback) {
      console.log('_request')
      HTTP.request({
        method: method,
        url: url,
        data: instance
      }).then(res => {
        console.log(`res => ${res}`)
        if(callback) callback(res)
        this.status = 'list'
      }).catch(error => {
        console.log(error)
      })
    }
  }
}

</script>
