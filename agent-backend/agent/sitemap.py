# Defines the structure of the mock site for the agent
# Format: URL -> List of available interactive elements

SITE_MAP = {
    "/": [
        {"id": "tab-cert", "desc": "Tab to login with Digital Certificate", "selector": "#tab-cert"},
        {"id": "tab-id", "desc": "Tab to login with ID and Password", "selector": "#tab-id"},
        {"id": "tab-qr", "desc": "Tab to login with QR Code", "selector": "#tab-qr"},
        {"id": "username", "desc": "Input field for User ID", "selector": "#username"},
        {"id": "password", "desc": "Input field for Password", "selector": "#password"},
        {"id": "btn-id-login", "desc": "Button to submit ID/Password login", "selector": "#btn-id-login"},
    ],
    "/dashboard": [
        {"id": "menu-tax", "desc": "Menu for Tax & Finance services", "selector": "#menu-tax"},
        {"id": "menu-welfare", "desc": "Menu for Welfare services", "selector": "#menu-welfare"},
        {"id": "menu-housing", "desc": "Menu for Housing services", "selector": "#menu-housing"},
        {"id": "menu-health", "desc": "Menu for Health services", "selector": "#menu-health"},
        {"id": "menu-jobs", "desc": "Menu for Jobs services", "selector": "#menu-jobs"},
        {"id": "menu-family", "desc": "Menu for Family services", "selector": "#menu-family"},
        {"id": "link-resident-reg", "desc": "Quick link for Resident Registration", "selector": "#link-resident-reg"},
        {"id": "link-tax-cert", "desc": "Quick link for Local Tax Certificate", "selector": "#link-tax-cert"},
    ],
    "/tax": [
        {"id": "btn-pay-tax", "desc": "Button to Pay Local Tax", "selector": "#btn-pay-tax"},
        {"id": "btn-tax-refund", "desc": "Button to Apply for Tax Refund", "selector": "#btn-tax-refund"},
        {"id": "btn-auto-pay", "desc": "Button to Apply for Auto-Payment", "selector": "#btn-auto-pay"},
        {"id": "btn-tax-cert", "desc": "Button to Get Local Tax Certificate", "selector": "#btn-tax-cert"},
        {"id": "btn-income-cert", "desc": "Button to Get Income Certificate", "selector": "#btn-income-cert"},
        {"id": "btn-back", "desc": "Button to go back to Dashboard", "selector": ".btn-back"},
    ],
    "/welfare": [
        {"id": "btn-child-allowance", "desc": "Button to Apply for Child Allowance", "selector": "#btn-child-allowance"},
        {"id": "btn-energy-voucher", "desc": "Button to Apply for Energy Voucher", "selector": "#btn-energy-voucher"},
        {"id": "btn-disability", "desc": "Button to Apply for Disability Support", "selector": "#btn-disability"},
        {"id": "btn-elderly-job", "desc": "Button to Apply for Elderly Job Program", "selector": "#btn-elderly-job"},
        {"id": "btn-back", "desc": "Button to go back to Dashboard", "selector": ".btn-back"},
    ]
}

def get_page_elements(url: str):
    # Simple exact match for now, can be improved to handle query params etc.
    return SITE_MAP.get(url, [])
