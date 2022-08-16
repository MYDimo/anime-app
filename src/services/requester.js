export const request = async (method, url, data, accessToken) => {
    try {
        let buildRequest;
        let options = {
            'Content-Type': 'application/json',
        }
        
        if (accessToken) {
            options['X-Authorization'] = accessToken;
        }

        if (method === 'GET') {
            if (accessToken) {
                options['X-Authorization'] = accessToken;
                buildRequest = fetch(url, {
                    method,
                    headers: options,
                });
            } else {
                buildRequest = fetch(url);
            }
        } else {
            buildRequest = fetch(url, {
                method,
                headers: options,
                body: JSON.stringify(data)
            })
        }
        
        const response = await buildRequest;
        let result;
        
        if (response.status == '204') {
            result = null;
        } else {
            result = await response.json();
        }

        return result;
    } catch (error) {
        console.log(error);
    }
}

export const get = request.bind({}, 'GET');
export const post = request.bind({}, 'POST');
export const put = request.bind({}, 'PUT');
export const remove = request.bind({}, 'DELETE');
export const patch = request.bind({}, 'PATCH');