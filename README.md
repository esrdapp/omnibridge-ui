# Omnibridge

The OmniBridge [multi-token extension](https://docs.tokenbridge.net/eth-xdai-amb-bridge/multi-token-extension) for the Arbitrary Message Bridge is the simplest way to transfer ANY ERC20/ERC677/ERC827 token to and from the HPB chain.

Split into two packages:

# Dapp (front-end) #
# Subgraph (sent to local Graph-node) # 


## Available Scripts

In the project directory, you can run:

### Dapp

#### `yarn dapp:start`

Runs the React app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will automatically reload if you make changes to the code.<br>
You will see the build errors and lint warnings in the console.

#### `yarn dapp:test`

Runs the React test watcher in an interactive mode.<br>
By default, runs tests related to files changed since the last commit.

#### `yarn dapp:build`

Builds the React app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!


### Subgraph - Networks 

run steps for EVERY network

#### STEP 1 `yarn subgraph:prepare-<network name>`

Generates subgraph.yaml for particular network. For example, `yarn subgraph:prepare-hpb`

#### STEP 2 `yarn subgraph:codegen`

Generates AssemblyScript types for smart contract ABIs and the subgraph schema.

#### STEP 3 `yarn subgraph:build`

Compiles the subgraph to WebAssembly.

#### STEP 4 `yarn subgraph:deploy-<network name>`

Deploys the subgraph for particular network to the official Graph Node. For example, `yarn subgraph:deploy-hpb`



### Subgraph - Bridges 

run steps for EVERY bridge pair

#### STEP 1a `yarn subgraph:prepare-<network name 1 - network name 2>`

Generates subgraph.yaml for particular bridge pair. For example, `yarn subgraph:prepare-hpb-bsc`

#### STEP 1b `yarn subgraph:prepare-<network name 2 - network name 1>`

Generates subgraph.yaml for particular bridge pair. For example, `yarn subgraph:prepare-bsc-hpb`

#### STEP 2 `yarn subgraph:codegen`

Generates AssemblyScript types for smart contract ABIs and the subgraph schema.

#### STEP 3 `yarn subgraph:build`

Compiles the subgraph to WebAssembly.

#### STEP 4a `yarn subgraph:deploy-<network name 1 - network name 2>`

Deploys the subgraph for particular network to the official Graph Node. for example, `yarn subgraph:deploy-hpb-bsc`

#### STEP 4b `yarn subgraph:deploy-<network name 2 - network name 1>`

Deploys the subgraph for particular network to the official Graph Node. for example, `yarn subgraph:deploy-bsc-hpb`


