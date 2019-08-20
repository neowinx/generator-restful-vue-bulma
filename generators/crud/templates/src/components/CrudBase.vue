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
    _post(url, instance, callback) {
      this._request(url, 'post', instance, callback)
    },
    _put(url, instance, callback) {
      this._request(url, 'put', instance, callback)
    },
    _delete(url, callback) {
      this._request(url, 'delete', undefined, callback)
    },
    _request(url, method, instance, callback) {
      HTTP.request({
        method: method,
        url: url,
        data: instance
      }).then(res => {
        if(callback) callback(res)
        this.status = 'list'
      }).catch(error => {
        console.log(error)
      })
    }
  }
}

</script>
