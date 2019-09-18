<script>
import {HTTP} from '@/http'
import accounting from 'accounting-js'

export default {
  data() {
    return {
      loading: false,
    }
  },
  filters: {
    dateFmt(date) {
      if (date)
        return date.split('T')[0]
      return date
    },
    currencyFmt(number) {
      if (number)
        return accounting.formatMoney(number, {
          symbol: 'Gs.',
          thousand: '.',
          format: `%s %v`,
          decimal: ',',
          precision: 0
        })
      return number
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
      this.loading = true;
      HTTP.request({
        method: method,
        url: url,
        data: instance
      }).then(res => {
        if(callback) callback(res)
        this.status = 'list'
        this.loading = false;
      }).catch(error => {
        console.log(error)
        this.loading = false;
      })
    }
  }
}

</script>
