'use client';

import { Shield, CheckCircle, FileText, AlertCircle, Wrench, Clock } from 'lucide-react';

export default function WarrantyPage() {
    return (
        <div className="min-h-screen bg-gunmetal-900">
            <div className="container mx-auto px-4 md:px-6 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Warranty Information
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Protecting your investment with comprehensive warranty coverage.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto space-y-12">
                    {/* Overview */}
                    <section className="bg-gunmetal-800 border border-white/10 rounded-lg p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Shield className="w-8 h-8 text-gold-500" />
                            <h2 className="text-2xl font-bold text-white">Warranty Overview</h2>
                        </div>
                        <div className="text-gray-400 space-y-4">
                            <p className="leading-relaxed">
                                At NovaChrono, we stand behind the quality and craftsmanship of every timepiece we sell. All watches come with a comprehensive manufacturer's warranty that protects you against defects in materials and workmanship.
                            </p>
                            <p className="leading-relaxed">
                                Most of our luxury watches include a <strong className="text-white">1-year warranty</strong>, though some premium brands offer extended coverage up to 5 years. Specific warranty terms vary by manufacturer and will be clearly stated in your purchase documentation.
                            </p>
                        </div>
                    </section>

                    {/* What's Covered */}
                    <section className="bg-gunmetal-800 border border-white/10 rounded-lg p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <CheckCircle className="w-8 h-8 text-gold-500" />
                            <h2 className="text-2xl font-bold text-white">What's Covered</h2>
                        </div>
                        <div className="text-gray-400 space-y-4">
                            <p className="leading-relaxed mb-4">
                                The manufacturer's warranty covers defects that occur under normal use, including:
                            </p>
                            <ul className="space-y-3 ml-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                    <span>Manufacturing defects in movement or mechanism</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                    <span>Defects in materials (case, crystal, crown, etc.)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                    <span>Workmanship issues not caused by external factors</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                    <span>Water resistance failure (if watch is used within specifications)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                    <span>Failure of hands, dial, or other internal components</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* What's Not Covered */}
                    <section className="bg-gunmetal-800 border border-white/10 rounded-lg p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <AlertCircle className="w-8 h-8 text-gold-500" />
                            <h2 className="text-2xl font-bold text-white">What's Not Covered</h2>
                        </div>
                        <div className="text-gray-400 space-y-4">
                            <p className="leading-relaxed mb-4">
                                The warranty does not cover damage resulting from:
                            </p>
                            <ul className="space-y-3 ml-4">
                                <li className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                                    <span>Normal wear and tear (scratches, scuffs on case or bracelet)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                                    <span>Accidents, impacts, or physical damage</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                                    <span>Unauthorized repairs or modifications</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                                    <span>Water damage due to improper use or crown not being secured</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                                    <span>Battery replacement (for quartz movements)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                                    <span>Leather straps, rubber bands, or other consumable parts</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                                    <span>Theft, loss, or mysterious disappearance</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Warranty Claim Process */}
                    <section className="bg-gunmetal-800 border border-white/10 rounded-lg p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <FileText className="w-8 h-8 text-gold-500" />
                            <h2 className="text-2xl font-bold text-white">How to File a Warranty Claim</h2>
                        </div>
                        <div className="text-gray-400 space-y-4">
                            <p className="leading-relaxed mb-4">
                                If you believe your watch has a warranty-covered defect, follow these steps:
                            </p>
                            <ol className="space-y-4 ml-4 list-decimal">
                                <li className="pl-2">
                                    <strong className="text-white">Contact Us:</strong> Reach out to our customer service team with your order number and a description of the issue.
                                </li>
                                <li className="pl-2">
                                    <strong className="text-white">Provide Documentation:</strong> You'll need to provide proof of purchase and photos of the watch showing the defect.
                                </li>
                                <li className="pl-2">
                                    <strong className="text-white">Receive Authorization:</strong> Once approved, we'll provide a Return Authorization number and prepaid shipping label.
                                </li>
                                <li className="pl-2">
                                    <strong className="text-white">Ship Your Watch:</strong> Carefully package your watch with all original materials and ship it to our service center.
                                </li>
                                <li className="pl-2">
                                    <strong className="text-white">Inspection & Repair:</strong> Our certified technicians will inspect and repair your watch, typically within 2-4 weeks.
                                </li>
                                <li className="pl-2">
                                    <strong className="text-white">Return Shipping:</strong> Your repaired watch will be returned to you fully insured at no charge.
                                </li>
                            </ol>
                        </div>
                    </section>

                    {/* Maintenance */}
                    <section className="bg-gunmetal-800 border border-white/10 rounded-lg p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Wrench className="w-8 h-8 text-gold-500" />
                            <h2 className="text-2xl font-bold text-white">Recommended Maintenance</h2>
                        </div>
                        <div className="text-gray-400 space-y-4">
                            <p className="leading-relaxed">
                                To keep your watch running optimally and maintain warranty coverage, we recommend:
                            </p>
                            <ul className="space-y-3 ml-4">
                                <li className="flex items-start gap-3">
                                    <span className="text-gold-500 mt-1">•</span>
                                    <span><strong className="text-white">Regular Servicing:</strong> Have your mechanical watch serviced every 3-5 years by an authorized service center</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gold-500 mt-1">•</span>
                                    <span><strong className="text-white">Water Resistance Testing:</strong> Annual testing recommended for dive watches</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gold-500 mt-1">•</span>
                                    <span><strong className="text-white">Proper Storage:</strong> Store in a cool, dry place away from magnetic fields</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gold-500 mt-1">•</span>
                                    <span><strong className="text-white">Gentle Cleaning:</strong> Clean with a soft cloth; avoid harsh chemicals</span>
                                </li>
                            </ul>
                            <p className="leading-relaxed mt-4 text-sm">
                                <em>Note: Regular maintenance is not covered under warranty but is essential for longevity and optimal performance.</em>
                            </p>
                        </div>
                    </section>

                    {/* Extended Warranty */}
                    <section className="bg-gunmetal-800 border border-white/10 rounded-lg p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Clock className="w-8 h-8 text-gold-500" />
                            <h2 className="text-2xl font-bold text-white">Extended Warranty Options</h2>
                        </div>
                        <div className="text-gray-400 space-y-4">
                            <p className="leading-relaxed">
                                For added peace of mind, we offer optional extended warranty plans that can extend your coverage up to 5 years total. Extended warranties can be purchased within 30 days of your original purchase.
                            </p>
                            <p className="leading-relaxed">
                                Extended warranty coverage includes all manufacturer warranty benefits plus additional protection against accidental damage. Contact our customer service team for pricing and details specific to your timepiece.
                            </p>
                        </div>
                    </section>

                    {/* Important Notes */}
                    <section className="bg-gold-500/10 border border-gold-500/30 rounded-lg p-8">
                        <h3 className="text-xl font-bold text-white mb-4">Important Notes</h3>
                        <div className="text-gray-400 space-y-3 text-sm">
                            <p className="flex items-start gap-2">
                                <span className="text-gold-500 mt-1">•</span>
                                <span>Keep your warranty card and proof of purchase in a safe place - you'll need them for service</span>
                            </p>
                            <p className="flex items-start gap-2">
                                <span className="text-gold-500 mt-1">•</span>
                                <span>Warranty is void if the watch is opened or serviced by unauthorized personnel</span>
                            </p>
                            <p className="flex items-start gap-2">
                                <span className="text-gold-500 mt-1">•</span>
                                <span>Warranty is non-transferable and applies only to the original purchaser</span>
                            </p>
                            <p className="flex items-start gap-2">
                                <span className="text-gold-500 mt-1">•</span>
                                <span>Different brands may have specific warranty terms - refer to manufacturer documentation</span>
                            </p>
                        </div>
                    </section>

                    {/* Contact */}
                    <div className="text-center pt-8">
                        <p className="text-gray-400 mb-4">
                            Questions about warranty coverage?
                        </p>
                        <a
                            href="/contact"
                            className="inline-block bg-gold-500 hover:bg-gold-600 text-gunmetal-900 font-semibold px-8 py-3 rounded-sm transition-colors"
                        >
                            Contact Customer Service
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
