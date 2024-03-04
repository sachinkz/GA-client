import axios from 'axios'

export const useFaceDetect = async(astica_input:string) => {

const requestData = {
    tkn: 'FCFD238E-E028-4C58-9839-F75CBF1D2C352C7A6439-CB02-49F6-A560-39585AC91CFF',
    modelVersion: '2.1_full',
    input: astica_input,
    visionParams: 'gpt, describe, describe_all, tags, faces',
    gpt_prompt: '',
    prompt_length: 95
};

    const data=await axios({
        method: 'post',
        url: 'https://vision.astica.ai/describe',
        data: requestData,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
