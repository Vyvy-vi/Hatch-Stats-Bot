const gql = require('graphql-tag')
const { GraphQLWrapper } = require('@aragon/connect-thegraph')

const HATCH_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/commonsswarm/aragon-hatch-xdai'
const HATCH_ADDRESS = '0xda58e84fdea0e5d11c380e78888e3239761b4a61'

const HATCHCONFIG_QUERY = gql`
  query {
    hatchConfig (id: "${HATCH_ADDRESS}") {
      address
      totalRaised
      state
    }
  }
`

module.exports = async function hatchInfo() {
  const graphqlClient = new GraphQLWrapper(HATCH_SUBGRAPH_URL)
  const result = await graphqlClient.performQuery(HATCHCONFIG_QUERY)

  if (!result.data) {
    console.log('Query error')
    return {
      funds: '---',
      state: '---'
    }
  }
  let totalFunds = (parseFloat(result.data.hatchConfig.totalRaised) / (10 ** 18))
  if(totalFunds >= 1000000)
  {
    totalFunds = `${(totalFunds / 1000000).toFixed(2)}M`
  }
  else if (totalFunds >= 1000)
  {
    totalFunds = `${(totalFunds / 1000).toFixed(2)}K`
  }
  else
  {
    totalFunds = `${totalFunds.toFixed(2)}`
  }

  return { 
    funds: totalFunds,
    state: result.data.hatchConfig.state
  }
}
