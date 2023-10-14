import axios from 'axios';

//스프링 부트 API의 기본 URL
const API_URL = 'http://10.0.2.15:8080';


class ApiService {
    // GET 요청 예시
    static GETSIGNUPKEYWORD() {
        return axios.get(API_URL + '/survey');
    }
    static GETSEARCHSEASONPAGEKEYWORD(myHeader) {
        return axios.get(API_URL + '/perfumes/recommend/type', { headers: { Authorization: `Bearer ${myHeader}` } });
    }
    static GETSEARCHTPOPAGEKEYWORD(myHeader) {
        return axios.get(API_URL + '/perfumes/recommend/tpo', { headers: { Authorization: `Bearer ${myHeader}` } });
    }
    static GETSEARCHKEYWORDRESULT(params, myHeader) {
        return axios.get(API_URL + '/perfumes/recommend?' + params, { headers: { Authorization: `Bearer ${myHeader}` } })
    }
    static GETCHECKBOOKMARK(perfumeId, myHeader) {
        return axios.get(API_URL + '/checkmarked?perfumeId=' + perfumeId, { headers: { Authorization: `Bearer ${myHeader}` } })
    }
    static GETPERFUMEBASICINFORMATION(params, myHeader) {
        return axios.get(API_URL + '/notesinfo/' + params, { headers: { Authorization: `Bearer ${myHeader}` } })
    }
    static GETPERFUMERATING(perfumeId, myHeader) {
        return axios.get(API_URL + '/perfumerating/' + perfumeId, { headers: { Authorization: `Bearer ${myHeader}` } })
    }
    static GETSEASONRECOMMENDATION(seasonId, myHeader) {
        return axios.get(API_URL + '/recommend?season=' + seasonId, { headers: { Authorization: `Bearer ${myHeader}` } })
    }
    static GETBOOKMARKLIST(myHeader, page) {
        return axios.get(API_URL + '/bookmark?page='+page, { headers: { Authorization: `Bearer ${myHeader}` } })
    }
    static GETRECOMMENDATIONBYBOOKMARK(myHeader) {
        return axios.get(API_URL + '/bookmark/recommend', { headers: { Authorization: `Bearer ${myHeader}` } })
    }
    static GETREVIEWLIST(perfumeId, myHeader) {
        return axios.get(API_URL + '/review/' + perfumeId, { headers: { Authorization: `Bearer ${myHeader}` } })
    }
    static GETSHOPPINGINFORMATION(perfumeName, myHeader) {
        return axios.get(API_URL + '/product/search?query=' + perfumeName, { headers: { Authorization: `Bearer ${myHeader}` } })
    }
    static GETSEARCHRESULTLIST(searchWord, myHeader) {
        return axios.get(API_URL + '/search?name=' + searchWord + '&page=0', { headers: { Authorization: `Bearer ${myHeader}` } })
    }
    static GETUSERINFORMATION(myHeader) {
        return axios.get(API_URL + '/profile', { headers: { Authorization: `Bearer ${myHeader}` } })
    }
    static GETUSERKEYWORDLIST(myHeader) {
        return axios.get(API_URL + '/keyword', { headers: { Authorization: `Bearer ${myHeader}` } })
    }
    static GETBOARDSLIST(myHeader, page) {
        return axios.get(API_URL + '/boards?page='+page, { headers: { Authorization: `Bearer ${myHeader}` } })
    }
    static GETMENUBOARDSLIST(selectedMenu, page, myHeader) {
        return axios.get(API_URL + '/boardtype/' + selectedMenu + '?page='+page, { headers: { Authorization: `Bearer ${myHeader}` } })
    }
    static GETBOARDDETAIL(boardId, myHeader) {
        return axios.get(API_URL + '/board/' + boardId, { headers: { Authorization: `Bearer ${myHeader}` } })
    }
    static GETCOMMENTSLIST(boardId, myHeader) {
        return axios.get(API_URL + '/comments/board/' + boardId, { headers: { Authorization: `Bearer ${myHeader}` } })
    }
    static GETUSERNAME(myHeader) {
        return axios.get(API_URL + '/username', { headers: { Authorization: `Bearer ${myHeader}` } })
    }
    static GETBRANDPERFUMELIST(brand_name, page, myHeader) {
        return axios.get(API_URL + '/brandperfume?name=' + brand_name + '&page='+page, { headers: { Authorization: `Bearer ${myHeader}` } })
    }

    // POST 요청
    static SIGNUP(data) {
        return axios.post(API_URL + '/signup', data);
    }
    static LOGIN(data) {
        return axios.post(API_URL + '/login', data);
    }
    static TOKENVALIDATION(myHeader) {
        return axios.post(API_URL + '/token-validation', {}, { headers: { Authorization: `Bearer ${myHeader}` } })
    }
    static LOGOUT(myHeader) {
        return axios.post(API_URL + '/service-logout', {}, { headers: { Authorization: `Bearer ${myHeader}` } });
    }
    static KEYWORDSIGNUP(data) {
        return axios.post(API_URL + '/survey', data)
    }
    static SETBOOKMARKYES(perfumeId, myHeader) {
        return axios.post(API_URL + '/bookmark?perfumeId=' + perfumeId, {}, { headers: { Authorization: `Bearer ${myHeader}` } })
    }
    static REGISTERREVIEW(data, myHeader) {
        return axios.post(API_URL + '/review/', data, { headers: { Authorization: `Bearer ${myHeader}` } });
    }
    static REGISTERCOMMUNITYBOARD(data, myHeader) {
        return axios.post(API_URL + '/board', data, {
            headers: {Authorization: `Bearer ${myHeader}`, 'Content-Type': 'multipart/form-data' },
            transformRequest: (data, headers) => {
                return data;
            },
        })
    }
    static REGISTERCOMMENT(boardId, commentWrite, myHeader) {
        return axios.post(API_URL + '/comments/board/' + boardId, commentWrite, { headers: { Authorization: `Bearer ${myHeader}` } })
    }
    static REGISTERREPLY(boardId, replyWrite, commentId, myHeader) {
        return axios.post(API_URL + '/comments/board/' + boardId + '/reply/' + commentId, replyWrite, { headers: { Authorization: `Bearer ${myHeader}` } })
    }

    // set
    static PUTMODIFYMYKEYWORDS(data, myHeader) {
        return axios.put(API_URL + '/keyword', data, { headers: { Authorization: `Bearer ${myHeader}` } })
    }


    // DELETE
    static SETBOOKMARKNO(perfumeId, myHeader) {
        console.log('perfumeId', perfumeId)
        return axios.delete(API_URL + '/bookmark?perfumeId=' + perfumeId, { headers: { Authorization: `Bearer ${myHeader}` } })
    }

}

export default ApiService;
