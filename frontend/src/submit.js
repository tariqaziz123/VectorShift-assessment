// submit.js

export const SubmitButton = () => {

    return (
        <div style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '20px',
            borderTop: '1px solid #334155',
            background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)'
        }}>
            <button 
                type="submit"
                style={{
                    padding: '12px 32px',
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                    border: '1px solid #818cf8',
                    borderRadius: '8px',
                    color: '#f1f5f9',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.3), 0 2px 4px -1px rgba(99, 102, 241, 0.15)',
                    transition: 'all 0.2s ease',
                    letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 12px -1px rgba(99, 102, 241, 0.4), 0 4px 6px -1px rgba(99, 102, 241, 0.2)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 6px -1px rgba(99, 102, 241, 0.3), 0 2px 4px -1px rgba(99, 102, 241, 0.15)';
                }}
            >
                Submit Pipeline
            </button>
        </div>
    );
}
