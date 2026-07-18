from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# Add CORS middleware to allow cross-origin requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allow all headers
)

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class Edge(BaseModel):
    id: str
    source: str
    target: str
    type: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Check if the pipeline forms a Directed Acyclic Graph (DAG)
    using Kahn's algorithm for topological sorting
    """
    if not nodes:
        return True
    
    # Build adjacency list and in-degree count
    adjacency = {node.id: [] for node in nodes}
    in_degree = {node.id: 0 for node in nodes}
    
    for edge in edges:
        if edge.source in adjacency and edge.target in adjacency:
            adjacency[edge.source].append(edge.target)
            in_degree[edge.target] += 1
    
    # Kahn's algorithm
    queue = [node_id for node_id in in_degree if in_degree[node_id] == 0]
    visited_count = 0
    
    while queue:
        current = queue.pop(0)
        visited_count += 1
        
        for neighbor in adjacency[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we visited all nodes, it's a DAG
    return visited_count == len(nodes)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    try:
        num_nodes = len(pipeline.nodes)
        num_edges = len(pipeline.edges)
        dag_check = is_dag(pipeline.nodes, pipeline.edges)
        
        return {
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': dag_check
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
