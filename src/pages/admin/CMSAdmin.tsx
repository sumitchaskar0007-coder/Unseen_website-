import { Archive, ArrowDown, ArrowUp, BriefcaseBusiness, ChevronLeft, ChevronRight, CircleGauge, Eye, FileText, FolderKanban, Globe2, Home, Images, Link2, LogOut, Menu, MessageSquareQuote, Pencil, Play, Plus, Search, Settings, Sparkles, Trash2, Upload, UserRound, UsersRound, Video, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { ChangeEvent, FormEvent, ReactNode } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import api from '../../api'
import { cmsService } from '../../services/cmsService'
import type { CmsRecord } from '../../services/cmsService'
import { fetchPageContent, getPageContent, savePageContent } from '../../data/pageContent'
import type { EditablePageContent, EditablePageSection, PageKey } from '../../data/pageContent'
import './admin-cms.css'

type CmsModule = 'projects' | 'clients' | 'blogs' | 'testimonials' | 'hiring' | 'services' | 'team'
type CmsItem = CmsRecord
type Field = { name: string; label: string; type?: 'text' | 'textarea' | 'url' | 'date' | 'select' | 'checkbox' | 'image' | 'images'; required?: boolean; options?: string[] }

const configs: Record<CmsModule, { title: string; singular: string; icon: typeof FolderKanban; fields: Field[]; statuses: string[] }> = {
  projects: { title:'Projects', singular:'Project', icon:FolderKanban, statuses:['Published','Draft'], fields:[
    {name:'name',label:'Project Name',required:true},{name:'client',label:'Client Name'},{name:'category',label:'Category',type:'select',options:['Brand Identity','Website','Digital Marketing','Film & Video','Campaign','SEO','Creative','Other']},{name:'year',label:'Year'},{name:'shortDescription',label:'Short Description',type:'textarea'},{name:'description',label:'Full Description',type:'textarea'},{name:'image',label:'Project Cover Image',type:'image',required:true},{name:'gallery',label:'Project Gallery',type:'images'},{name:'video',label:'Project Video',type:'url'},{name:'url',label:'Project URL',type:'url'},{name:'services',label:'Services'},{name:'challenge',label:'Challenge',type:'textarea'},{name:'solution',label:'Solution',type:'textarea'},{name:'results',label:'Results',type:'textarea'},{name:'featured',label:'Featured Project',type:'checkbox'},
  ]},
  clients: { title:'Clients', singular:'Client', icon:UsersRound, statuses:['Published','Draft'], fields:[
    {name:'name',label:'Client Name',required:true},{name:'company',label:'Company Name'},{name:'industry',label:'Industry'},{name:'url',label:'Website',type:'url'},{name:'image',label:'Client Logo',type:'image',required:true},{name:'description',label:'Short Description',type:'textarea'},{name:'featured',label:'Featured Client',type:'checkbox'},
  ]},
  blogs: { title:'Blog Posts', singular:'Blog', icon:FileText, statuses:['Published','Draft'], fields:[
    {name:'name',label:'Blog Title',required:true},{name:'slug',label:'Slug'},{name:'shortDescription',label:'Short Description',type:'textarea'},{name:'description',label:'Blog Content',type:'textarea',required:true},{name:'image',label:'Featured Image',type:'image'},{name:'author',label:'Author'},{name:'category',label:'Category',type:'select',options:['Branding','Marketing','Web Development','SEO','Business','Creative','Technology','News']},{name:'tags',label:'Tags'},{name:'publishDate',label:'Publish Date',type:'date'},{name:'featured',label:'Featured Blog',type:'checkbox'},
  ]},
  testimonials: { title:'Testimonials', singular:'Testimonial', icon:MessageSquareQuote, statuses:['Published','Hidden'], fields:[
    {name:'name',label:'Client Name',required:true},{name:'company',label:'Company Name'},{name:'designation',label:'Designation'},{name:'image',label:'Profile Image',type:'image'},{name:'description',label:'Testimonial',type:'textarea',required:true},{name:'rating',label:'Rating',type:'select',options:['5','4','3','2','1']},{name:'project',label:'Project'},{name:'featured',label:'Featured',type:'checkbox'},
  ]},
  hiring: { title:'Hiring / Jobs', singular:'Job', icon:BriefcaseBusiness, statuses:['Open','Closed','Draft'], fields:[
    {name:'name',label:'Job Title',required:true},{name:'department',label:'Department'},{name:'location',label:'Location'},{name:'jobType',label:'Job Type',type:'select',options:['Full Time','Part Time','Internship','Freelance','Contract']},{name:'experience',label:'Experience'},{name:'salary',label:'Salary'},{name:'shortDescription',label:'Short Description',type:'textarea'},{name:'description',label:'Job Description',type:'textarea'},{name:'responsibilities',label:'Responsibilities',type:'textarea'},{name:'requirements',label:'Requirements',type:'textarea'},{name:'skills',label:'Skills'},{name:'benefits',label:'Benefits',type:'textarea'},{name:'email',label:'Application Email'},{name:'url',label:'Application URL',type:'url'},{name:'deadline',label:'Deadline',type:'date'},
  ]},
  services: { title:'Services', singular:'Service', icon:Sparkles, statuses:['Published','Draft'], fields:[
    {name:'name',label:'Service Name',required:true},{name:'slug',label:'Slug'},{name:'shortDescription',label:'Short Description',type:'textarea'},{name:'description',label:'Full Description',type:'textarea'},{name:'image',label:'Service Image',type:'image'},{name:'icon',label:'Icon'},{name:'featured',label:'Featured',type:'checkbox'},{name:'order',label:'Order'},
  ]},
  team: { title:'Team', singular:'Team Member', icon:UserRound, statuses:['Published','Draft'], fields:[
    {name:'name',label:'Name',required:true},{name:'designation',label:'Designation'},{name:'department',label:'Department'},{name:'description',label:'Bio',type:'textarea'},{name:'image',label:'Profile Image',type:'image'},{name:'email',label:'Email'},{name:'linkedin',label:'LinkedIn',type:'url'},{name:'instagram',label:'Instagram',type:'url'},{name:'url',label:'Website',type:'url'},
  ]},
}

const contentLinks = [
  ['projects','Projects',FolderKanban],['clients','Clients',UsersRound],['blogs','Blogs',FileText],['testimonials','Testimonials',MessageSquareQuote],['hiring','Hiring',BriefcaseBusiness],['services','Services',Sparkles],['team','Team',UserRound],['media','Media',Images],
] as const
const readItems = (module:string) => cmsService.list<CmsItem>(module)
const dashboardStats = [['Projects','projects',FolderKanban],['Clients','clients',UsersRound],['Blog Posts','blogs',FileText],['Testimonials','testimonials',MessageSquareQuote],['Open Positions','hiring',BriefcaseBusiness],['Team Members','team',UserRound]] as const

export function AdminLayout() {
  const [collapsed,setCollapsed] = useState(false)
  const [mobileOpen,setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const activeModule = location.pathname.split('/').slice(2,4).join('/') || 'dashboard'
  useEffect(() => setMobileOpen(false),[location.pathname])
  const logout = () => { localStorage.removeItem('adminToken'); localStorage.removeItem('adminEmail'); navigate('/admin/login') }
  return <div className={`cms-app ${collapsed?'is-collapsed':''}`}>
    {mobileOpen&&<button className="cms-scrim" aria-label="Close menu" onClick={()=>setMobileOpen(false)}/>}<aside className={`cms-sidebar ${mobileOpen?'is-open':''}`}><div className="cms-brand"><Link to="/admin"><strong>UNSEEN</strong><span>STUDIOS</span></Link><button onClick={()=>setCollapsed((v)=>!v)} aria-label="Collapse sidebar">{collapsed?<ChevronRight/>:<ChevronLeft/>}</button></div><nav aria-label="Admin navigation"><p>Overview</p><NavLink end to="/admin"><CircleGauge/><span>Dashboard</span></NavLink><p>Content</p>{contentLinks.map(([path,label,Icon])=><NavLink key={path} to={`/admin/${path}`}><Icon/><span>{label}</span></NavLink>)}<p>Website</p><NavLink to="/admin/homepage"><Home/><span>Homepage</span></NavLink><NavLink to="/admin/pages/about"><Globe2/><span>About Page</span></NavLink><NavLink to="/admin/pages/process"><Globe2/><span>Process Page</span></NavLink><NavLink to="/admin/pages/contact"><Globe2/><span>Contact Page</span></NavLink><NavLink to="/admin/settings"><Settings/><span>Settings</span></NavLink></nav><button className="cms-logout" onClick={logout}><LogOut/><span>Logout</span></button></aside>
    <div className="cms-workspace"><header className="cms-topbar"><button className="cms-mobile-menu" onClick={()=>setMobileOpen(true)} aria-label="Open menu"><Menu/></button><div><span>Content Management</span><small>Unseen Studios</small></div><div className="cms-admin-avatar">A</div></header><main><Outlet key={activeModule}/></main></div>
  </div>
}

function PageHeader({eyebrow,title,copy,action}:{eyebrow:string;title:string;copy?:string;action?:ReactNode}) { return <header className="cms-page-header"><div><p className="cms-kicker">{eyebrow}</p><h1>{title}</h1>{copy&&<p>{copy}</p>}</div>{action}</header> }
function StatusBadge({status}:{status:string}) { return <span className={`cms-status is-${status.toLowerCase().replace(/\s/g,'-')}`}>{status}</span> }

export function AdminHome() {
  const [,setContentRevision]=useState(0)
  const actions = [['Add Project','projects'],['Add Client','clients'],['Write Blog','blogs'],['Add Testimonial','testimonials'],['Add Job','hiring'],['Add Team Member','team']] as const
  useEffect(()=>{let active=true;Promise.allSettled(dashboardStats.map(([,key])=>cmsService.sync(key))).then(()=>{if(active)setContentRevision((revision)=>revision+1)});return()=>{active=false}},[])
  return <div className="cms-page"><PageHeader eyebrow="Dashboard" title="Welcome back, Admin" copy="Manage your Unseen Studios website content."/><section className="cms-stat-grid">{dashboardStats.map(([label,key,Icon])=>{const items=readItems(key);const count=key==='hiring'?items.filter((item)=>item.status==='Open').length:items.length;return <Link to={`/admin/${key}`} className="cms-stat-card" key={key}><div><span>{label}</span><strong>{String(count).padStart(2,'0')}</strong></div><Icon/></Link>})}</section><section className="cms-panel"><div className="cms-panel-head"><div><p className="cms-kicker">Quick actions</p><h2>Create new content</h2></div></div><div className="cms-quick-grid">{actions.map(([label,key])=><Link to={`/admin/${key}/new`} key={key}><Plus/>{label}<span>↗</span></Link>)}</div></section></div>
}

export function ContentManager({module}:{module:CmsModule}) {
  const config=configs[module], location=useLocation(), navigate=useNavigate(), {id}=useParams()
  const [items,setItems]=useState<CmsItem[]>(()=>readItems(module)),[loading,setLoading]=useState(true),[search,setSearch]=useState(''),[filter,setFilter]=useState('All'),[deleteItem,setDeleteItem]=useState<CmsItem|null>(null),[previewItem,setPreviewItem]=useState<CmsItem|null>(null),[message,setMessage]=useState('')
  const isEditor=location.pathname.endsWith('/new')||Boolean(id),editing=id?items.find((item)=>item.id===id):undefined
  const filtered=useMemo(()=>items.filter((item)=>String(item.name||'').toLowerCase().includes(search.toLowerCase())&&(filter==='All'||item.status===filter||(filter==='Featured'&&item.featured))),[items,search,filter])
  useEffect(()=>{
    let active=true
    const localRecords=readItems(module)
    const migrationKey=`unseen-cms-server-migrated-${module}`
    const needsMigration=!localStorage.getItem(migrationKey)
    setLoading(true)
    cmsService.sync<CmsItem>(module).then(async(records)=>{
      // Preserve content created by the older browser-only admin. Local items
      // take precedence during this one-time migration, including matching IDs.
      const merged=needsMigration&&localRecords.length
        ? Array.from(new Map([...records,...localRecords].map((item)=>[item.id,item])).values())
        : records
      if(needsMigration&&localRecords.length&&JSON.stringify(merged)!==JSON.stringify(records))await cmsService.saveRemote(module,merged)
      localStorage.setItem(migrationKey,'1')
      if(active)setItems(merged)
    }).catch(()=>{
      cmsService.save(module,localRecords)
      if(active){setItems(localRecords);setMessage('Your local data is safe, but the shared database could not be reached.')}
    }).finally(()=>{if(active)setLoading(false)})
    return()=>{active=false}
  },[module])
  const persist=async(next:CmsItem[])=>{await cmsService.saveRemote(module,next);setItems(next)}
  if(loading)return <div className="cms-page"><PageHeader eyebrow="Content" title={config.title} copy="Loading the latest website data..."/></div>
  if(isEditor)return <ContentEditor module={module} existing={editing} onSave={async(item)=>{const wasEditing=Boolean(editing);await persist(editing?items.map((entry)=>entry.id===editing.id?item:entry):[item,...items]);navigate(`/admin/${module}`,{state:{message:`${config.singular} ${wasEditing?'updated':'created'} successfully.`}})}}/>
  const remove=()=>{if(!deleteItem)return;const next=items.filter((item)=>item.id!==deleteItem.id);void persist(next).then(()=>{setDeleteItem(null);setMessage(`${config.singular} deleted successfully.`)}).catch((error)=>setMessage(error instanceof Error?error.message:'Unable to publish this change.'))}
  const toggle=(item:CmsItem)=>{const status=item.status===config.statuses[0]?config.statuses[1]:config.statuses[0];void persist(items.map((entry)=>entry.id===item.id?{...entry,status}:entry)).then(()=>setMessage(`${config.singular} status updated.`)).catch((error)=>setMessage(error instanceof Error?error.message:'Unable to publish this change.'))}
  return <div className="cms-page"><PageHeader eyebrow="Content" title={config.title} copy={`Add, edit, publish and organise ${config.title.toLowerCase()}.`} action={<Link className="cms-primary-button" to={`/admin/${module}/new`}><Plus/> Add {config.singular}</Link>}/>{(message||(location.state as {message?:string})?.message)&&<div className="cms-success">{message||(location.state as {message?:string}).message}</div>}<div className="cms-toolbar"><label className="cms-search"><Search/><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder={`Search ${config.title.toLowerCase()}...`}/></label><div className="cms-filters">{['All',...config.statuses,'Featured'].map((status)=><button key={status} className={filter===status?'is-active':''} onClick={()=>setFilter(status)}>{status}</button>)}</div></div>{filtered.length?<div className="cms-content-grid">{filtered.map((item)=><article className="cms-content-card" key={item.id}>{item.image?<img src={String(item.image)} alt=""/>:<div className="cms-card-placeholder"><config.icon/></div>}<div className="cms-card-body"><div className="cms-card-meta"><StatusBadge status={item.status}/>{Boolean(item.featured)&&<StatusBadge status="Featured"/>}</div><h2>{String(item.name||'Untitled')}</h2><p>{String(item.shortDescription||item.description||item.category||'No description added yet.')}</p><div className="cms-card-actions"><button onClick={()=>setPreviewItem(item)}><Eye/> View</button><Link to={`/admin/${module}/${item.id}/edit`}><Pencil/> Edit</Link><button onClick={()=>toggle(item)}><Globe2/> {item.status===config.statuses[0]?'Unpublish':'Publish'}</button><button className="is-danger" onClick={()=>setDeleteItem(item)}><Trash2/> Delete</button></div></div></article>)}</div>:<EmptyState title={`No ${config.title.toLowerCase()} yet`} copy={`Add your first ${config.singular.toLowerCase()} to start managing this section.`} to={`/admin/${module}/new`}/>} {deleteItem&&<ConfirmDialog title={`Delete ${config.singular}?`} copy={`Are you sure you want to delete “${String(deleteItem.name)}”?`} onCancel={()=>setDeleteItem(null)} onConfirm={remove}/>} {previewItem&&<ContentPreview item={previewItem} onClose={()=>setPreviewItem(null)}/>}</div>
}

function ContentEditor({module,existing,onSave}:{module:CmsModule;existing?:CmsItem;onSave:(item:CmsItem)=>Promise<void>}) {
  const config=configs[module],[form,setForm]=useState<Record<string,string|boolean|string[]>>(()=>existing||{status:config.statuses[0]}),[errors,setErrors]=useState<Record<string,string>>({}),[saveError,setSaveError]=useState(''),[saving,setSaving]=useState(false)
  const update=(name:string,value:string|boolean|string[])=>setForm((current)=>({...current,[name]:value}))
  const submit=async(event:FormEvent)=>{event.preventDefault();const next:Record<string,string>={};config.fields.forEach((field)=>{if(field.required&&!form[field.name])next[field.name]=`${field.label} is required.`});setErrors(next);if(Object.keys(next).length)return;setSaveError('');setSaving(true);try{await onSave({...form,id:existing?.id||crypto.randomUUID(),status:String(form.status||config.statuses[0])} as CmsItem)}catch(error){setSaveError(error instanceof Error?error.message:'Unable to publish content.')}finally{setSaving(false)}}
  return <div className="cms-page"><PageHeader eyebrow={existing?'Edit content':'New content'} title={`${existing?'Edit':'Add'} ${config.singular}`} copy="Complete the fields, preview media and choose the publishing status."/>{saveError&&<div className="cms-form-error cms-media-error">{saveError}</div>}<form className="cms-editor" onSubmit={submit}><div className="cms-form-grid">{config.fields.map((field)=><FormField key={field.name} field={field} value={form[field.name]} error={errors[field.name]} onChange={(value)=>update(field.name,value)}/>)}<label className="cms-field"><span>Status</span><select value={String(form.status||config.statuses[0])} onChange={(e)=>update('status',e.target.value)}>{config.statuses.map((status)=><option key={status}>{status}</option>)}</select></label></div><div className="cms-editor-actions"><Link to={`/admin/${module}`} className="cms-secondary-button">Cancel</Link><button className="cms-primary-button" type="submit" disabled={saving}>{saving?'Publishing...':existing?'Save changes':`Create ${config.singular}`}</button></div></form></div>
}

function FormField({field,value,error,onChange}:{field:Field;value:unknown;error?:string;onChange:(value:string|boolean|string[])=>void}) {
  if(field.type==='checkbox')return <label className="cms-check"><input type="checkbox" checked={Boolean(value)} onChange={(e)=>onChange(e.target.checked)}/><span><strong>{field.label}</strong><small>Show this item prominently on the website.</small></span></label>
  if(field.type==='image'||field.type==='images')return <ImageUploader label={field.label} multiple={field.type==='images'} required={field.required} value={value} onChange={onChange} error={error}/>
  return <label className={`cms-field ${field.type==='textarea'?'is-wide':''}`}><span>{field.label}{field.required&&' *'}</span>{field.type==='textarea'?<textarea value={String(value||'')} onChange={(e)=>onChange(e.target.value)} rows={5}/>:field.type==='select'?<select value={String(value||'')} onChange={(e)=>onChange(e.target.value)}><option value="">Select {field.label}</option>{field.options?.map((option)=><option key={option}>{option}</option>)}</select>:<input type={field.type||'text'} value={String(value||'')} onChange={(e)=>onChange(e.target.value)}/>} {error&&<small className="cms-form-error">{error}</small>}</label>
}

function ImageUploader({label,multiple,value,onChange,error,required}:{label:string;multiple:boolean;value:unknown;onChange:(value:string|string[])=>void;error?:string;required?:boolean}) {
  const previews=Array.isArray(value)?value:value?[String(value)]:[]
  const processFiles=(files:File[])=>{Promise.all(files.map((file)=>new Promise<string>((resolve)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result));reader.readAsDataURL(file)}))).then((urls)=>onChange(multiple?[...previews,...urls]:urls[0]||''))}
  const pick=(event:ChangeEvent<HTMLInputElement>)=>processFiles(Array.from(event.target.files||[]))
  const move=(index:number,direction:number)=>{const next=[...previews],target=index+direction;if(target<0||target>=next.length)return;[next[index],next[target]]=[next[target],next[index]];onChange(next)}
  return <div className="cms-upload-field"><span>{label}{required&&' *'}</span><label className="cms-dropzone" onDragOver={(event)=>event.preventDefault()} onDrop={(event)=>{event.preventDefault();processFiles(Array.from(event.dataTransfer.files).filter((file)=>file.type.startsWith('image/')))}}><Upload/><strong>Drag & drop image</strong><small>or browse files · PNG, JPG, WEBP</small><input type="file" accept="image/*" multiple={multiple} onChange={pick}/></label>{previews.length>0&&<div className="cms-previews">{previews.map((preview,index)=><div key={`${preview.slice(0,20)}-${index}`}><img src={preview} alt="Upload preview"/>{multiple&&<div className="cms-preview-order"><button type="button" onClick={()=>move(index,-1)} disabled={index===0} aria-label="Move image left">‹</button><button type="button" onClick={()=>move(index,1)} disabled={index===previews.length-1} aria-label="Move image right">›</button></div>}<button className="cms-preview-remove" type="button" onClick={()=>onChange(multiple?previews.filter((_,i)=>i!==index):'')} aria-label="Remove image"><X/></button></div>)}</div>}{error&&<small className="cms-form-error">{error}</small>}</div>
}

function EmptyState({title,copy,to}:{title:string;copy:string;to:string}) { return <div className="cms-empty"><Archive/><h2>{title}</h2><p>{copy}</p>{to!=='#'&&<Link className="cms-primary-button" to={to}><Plus/> Add content</Link>}</div> }
function ConfirmDialog({title,copy,onCancel,onConfirm}:{title:string;copy:string;onCancel:()=>void;onConfirm:()=>void}) { return <div className="cms-modal" onMouseDown={onCancel}><div role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" onMouseDown={(e)=>e.stopPropagation()}><Trash2/><h2 id="confirm-title">{title}</h2><p>{copy}</p><div><button className="cms-secondary-button" onClick={onCancel}>Cancel</button><button className="cms-danger-button" onClick={onConfirm}>Delete</button></div></div></div> }
function ContentPreview({item,onClose}:{item:CmsItem;onClose:()=>void}) { return <div className="cms-modal cms-preview-modal" onMouseDown={onClose}><div role="dialog" aria-modal="true" aria-labelledby="preview-title" onMouseDown={(event)=>event.stopPropagation()}>{item.image&&<img src={String(item.image)} alt=""/>}<StatusBadge status={item.status}/><h2 id="preview-title">{String(item.name||'Untitled')}</h2><p>{String(item.description||item.shortDescription||'No description added yet.')}</p><div><button className="cms-secondary-button" onClick={onClose}>Close preview</button></div></div></div> }

export function MediaManager() {
  const categories=['General','Projects','Behind the Scenes','Social Media','Ads','Campaigns','Events','Team']
  const [items,setItems]=useState<CmsItem[]>(()=>readItems('media'))
  const [search,setSearch]=useState('')
  const [filter,setFilter]=useState('All')
  const [showEditor,setShowEditor]=useState(false)
  const [files,setFiles]=useState<File[]>([])
  const [error,setError]=useState('')
  const [form,setForm]=useState({name:'',description:'',category:'General',customCategory:'',source:'upload',url:'',status:'Published'})
  const itemCategories=Array.from(new Set(items.map((item)=>String(item.category||'General'))))
  const visible=items.filter((item)=>{
    const query=search.toLowerCase()
    const matchesSearch=String(item.name||'').toLowerCase().includes(query)||String(item.description||'').toLowerCase().includes(query)
    return matchesSearch&&(filter==='All'||item.category===filter||item.mediaType===filter.toLowerCase())
  })
  useEffect(()=>{
    let active=true
    const localRecords=readItems('media')
    const migrationKey='unseen-cms-server-migrated-media'
    const needsMigration=!localStorage.getItem(migrationKey)
    cmsService.sync<CmsItem>('media').then(async(records)=>{
      // The previous version stored media only in this browser. On the first
      // deployment with server-backed media, preserve and publish that cache.
      if(needsMigration&&localRecords.length){
        try {
          const mergedRecords=Array.from(new Map([...records,...localRecords].map((item)=>[item.id,item])).values())
          const migratedRecords=await publishMediaFiles(mergedRecords)
          await cmsService.saveRemote('media',migratedRecords)
          localStorage.setItem(migrationKey,'1')
          if(active)setItems(migratedRecords)
        } catch(reason) {
          cmsService.save('media',localRecords)
          if(active){setItems(localRecords);setError(reason instanceof Error?reason.message:'Your local media is safe, but it could not be published yet.')}
        }
        return
      }
      localStorage.setItem(migrationKey,'1')
      if(active)setItems(records)
    }).catch(()=>{
      cmsService.save('media',localRecords)
      if(active){setItems(localRecords);setError('Your local media is safe, but the shared library could not be reached.')}
    })
    return()=>{active=false}
  },[])
  const persist=async(next:CmsItem[])=>{await cmsService.saveRemote('media',next);setItems(next)}
  const reset=()=>{setForm({name:'',description:'',category:'General',customCategory:'',source:'upload',url:'',status:'Published'});setFiles([]);setError('');setShowEditor(false)}
  const remove=(id:string)=>{void persist(items.filter((item)=>item.id!==id)).catch((reason)=>setError(reason instanceof Error?reason.message:'Unable to delete media.'))}
  const readFile=(file:File)=>new Promise<string>((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result));reader.onerror=()=>reject(new Error('Could not read file.'));reader.readAsDataURL(file)})
  const submit=async(event:FormEvent)=>{
    event.preventDefault();setError('')
    const category=form.category==='Other'?form.customCategory.trim():form.category
    if(!category){setError('Please enter a category.');return}
    if(form.source==='upload'&&!files.length){setError('Choose at least one image or video.');return}
    if(form.source==='link'&&!form.url.trim()){setError('Enter a YouTube or direct video URL.');return}
    try {
      let created:CmsItem[]=[]
      if(form.source==='upload'){
        const total=files.reduce((sum,file)=>sum+file.size,0)
        if(total>3*1024*1024)throw new Error('Browser storage is limited. Upload files under 3 MB total, or use a hosted media backend.')
        created=await Promise.all(files.map(async(file,index)=>{
          const data=await readFile(file),isVideo=file.type.startsWith('video/')
          const response=await api.post<{url:string}>('/media/upload',{name:file.name,data})
          const source=response.data.url
          return {id:crypto.randomUUID(),name:form.name.trim()||(files.length>1?`${file.name.replace(/\.[^.]+$/,'')} ${index+1}`:file.name.replace(/\.[^.]+$/,'')),description:form.description,category,status:form.status,mediaType:isVideo?'video':'image',image:isVideo?'':source,videoUrl:isVideo?source:'',size:`${(file.size/1024/1024).toFixed(2)} MB`} as CmsItem
        }))
      } else {
        const url=form.url.trim(),isYoutube=/youtu\.be|youtube\.com/i.test(url),isInstagram=/instagram\.com/i.test(url)
        created=[{id:crypto.randomUUID(),name:form.name.trim()||'Video',description:form.description,category,status:form.status,mediaType:isYoutube?'youtube':isInstagram?'instagram':'video',image:'',videoUrl:url,size:'External link'} as CmsItem]
      }
      await persist([...created,...items]);reset()
    } catch(reason) {
      setError(reason instanceof Error?reason.message:'Unable to save media. Browser storage may be full.')
    }
  }
  const sourceFor=(item:CmsItem)=>String(item.image||item.videoUrl||'')
  return <div className="cms-page">
    <PageHeader eyebrow="Library" title="Media" copy="Organise images, videos, YouTube links and advertising creative by category." action={<button className="cms-primary-button" onClick={()=>setShowEditor((value)=>!value)}>{showEditor?<X/>:<Plus/>}{showEditor?'Close':'Add media'}</button>}/>
    {showEditor&&<form className="cms-editor cms-media-editor" onSubmit={submit}>
      <div className="cms-media-source-tabs"><button type="button" className={form.source==='upload'?'is-active':''} onClick={()=>setForm({...form,source:'upload'})}><Upload/> Upload files</button><button type="button" className={form.source==='link'?'is-active':''} onClick={()=>setForm({...form,source:'link'})}><Link2/> Video link</button></div>
      <div className="cms-form-grid"><label className="cms-field"><span>Title</span><input value={form.name} onChange={(event)=>setForm({...form,name:event.target.value})} placeholder="Campaign shoot, product reel..."/></label><label className="cms-field"><span>Category</span><select value={form.category} onChange={(event)=>setForm({...form,category:event.target.value})}>{categories.map((category)=><option key={category}>{category}</option>)}<option>Other</option></select></label>{form.category==='Other'&&<label className="cms-field"><span>Custom category *</span><input required value={form.customCategory} onChange={(event)=>setForm({...form,customCategory:event.target.value})}/></label>}<label className="cms-field"><span>Status</span><select value={form.status} onChange={(event)=>setForm({...form,status:event.target.value})}><option>Published</option><option>Draft</option></select></label><label className="cms-field is-wide"><span>Description</span><textarea rows={3} value={form.description} onChange={(event)=>setForm({...form,description:event.target.value})} placeholder="Optional media description"/></label></div>
      {form.source==='upload'?<label className="cms-dropzone cms-media-dropzone"><Upload/><strong>Choose images or videos</strong><small>PNG, JPG, WEBP, GIF, MP4, WEBM · maximum 3 MB total while using browser storage</small><input type="file" multiple accept="image/*,video/mp4,video/webm" onChange={(event)=>setFiles(Array.from(event.target.files||[]))}/>{files.length>0&&<span>{files.length} file{files.length===1?'':'s'} selected</span>}</label>:<label className="cms-field"><span>YouTube or direct video URL *</span><input type="url" value={form.url} onChange={(event)=>setForm({...form,url:event.target.value})} placeholder="https://youtube.com/watch?v=..."/></label>}
      {error&&<p className="cms-form-error cms-media-error">{error}</p>}<div className="cms-editor-actions"><button type="button" className="cms-secondary-button" onClick={reset}>Cancel</button><button className="cms-primary-button" type="submit">Save media</button></div>
    </form>}
    <div className="cms-toolbar cms-media-toolbar"><label className="cms-search"><Search/><input value={search} onChange={(event)=>setSearch(event.target.value)} placeholder="Search media..."/></label><div className="cms-filters">{Array.from(new Set(['All','Image','Video','YouTube','Instagram',...itemCategories])).map((value)=><button key={value} className={filter===value?'is-active':''} onClick={()=>setFilter(value)}>{value}</button>)}</div></div>
    {visible.length?<div className="cms-media-grid">{visible.map((item)=><article key={item.id}><MediaThumb item={item}/><div><div className="cms-media-card-meta"><StatusBadge status={String(item.category||'General')}/><StatusBadge status={String(item.mediaType||'image')}/></div><strong>{String(item.name||'Untitled media')}</strong><span>{String(item.size||'')}</span><div><button onClick={()=>navigator.clipboard.writeText(sourceFor(item))}>Copy source</button><button aria-label={`Delete ${String(item.name||'media')}`} onClick={()=>remove(item.id)}><Trash2/></button></div></div></article>)}</div>:<EmptyState title="No media found" copy={items.length?'Try another search or category.':'Add images, video files, YouTube links or advertising media to start your library.'} to="#"/>}
  </div>
}

async function publishMediaFiles(records:CmsItem[]) {
  return Promise.all(records.map(async(item)=>{
    const next={...item}
    for(const field of ['image','videoUrl'] as const){
      const source=String(next[field]||'')
      if(!source.startsWith('data:'))continue
      const response=await api.post<{url:string}>('/media/upload',{name:String(item.name||'media'),data:source})
      next[field]=response.data.url
    }
    return next
  }))
}

function youtubeEmbed(url:string) {
  const match=url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^?&/]+)/i)
  return match?`https://www.youtube.com/embed/${match[1]}`:''
}

function instagramEmbed(url:string) {
  const match=url.match(/instagram\.com\/(p|reel|reels)\/([^?/#]+)/i)
  return match?`https://www.instagram.com/${match[1]}/${match[2]}/embed`:url
}

function MediaThumb({item}:{item:CmsItem}) {
  const kind=String(item.mediaType||'image'),source=String(item.videoUrl||'')
  if(kind==='youtube')return <div className="cms-media-video"><iframe src={youtubeEmbed(source)} title={String(item.name||'YouTube video')} loading="lazy" allowFullScreen/></div>
  if(kind==='instagram')return <div className="cms-media-video"><iframe src={instagramEmbed(source)} title={String(item.name||'Instagram media')} loading="lazy" allowFullScreen/></div>
  if(kind==='video')return <div className="cms-media-video"><video src={source} controls preload="metadata"/><Video/></div>
  if(item.image)return <img src={String(item.image)} alt={String(item.name||'Media')}/>
  return <div className="cms-media-placeholder"><Play/></div>
}

type PageField = {
  name: Exclude<keyof EditablePageContent, 'sections'>
  label: string
  type?: 'text' | 'textarea' | 'url'
}

const pageEditorConfig: Record<PageKey, { title: string; sectionTitle: string; addLabel: string; fields: PageField[] }> = {
  about: {
    title: 'About Page', sectionTitle: 'Additional sections', addLabel: 'Add section', fields: [
      {name:'eyebrow',label:'Page Eyebrow'},
      {name:'title',label:'Main Heading',type:'textarea'},
      {name:'subtitle',label:'Intro Label',type:'textarea'},
      {name:'secondaryTitle',label:'Intro Statement',type:'textarea'},
      {name:'body',label:'Story Paragraph One',type:'textarea'},
      {name:'bodyTwo',label:'Story Paragraph Two',type:'textarea'},
      {name:'buttonLabel',label:'Call-to-action Label'},
      {name:'buttonUrl',label:'Call-to-action Link'},
    ],
  },
  process: {
    title: 'Process Page', sectionTitle: 'Process steps', addLabel: 'Add step', fields: [
      {name:'eyebrow',label:'Page Eyebrow'},
      {name:'title',label:'Main Heading',type:'textarea'},
      {name:'subtitle',label:'Introduction',type:'textarea'},
    ],
  },
  contact: {
    title: 'Contact Page', sectionTitle: 'Additional sections', addLabel: 'Add section', fields: [
      {name:'eyebrow',label:'Page Eyebrow'},
      {name:'title',label:'Main Heading',type:'textarea'},
      {name:'subtitle',label:'Introduction',type:'textarea'},
      {name:'buttonLabel',label:'Form Button Label'},
      {name:'mapEmbedUrl',label:'Google Maps Embed URL',type:'url'},
      {name:'services',label:'Services (one per line)',type:'textarea'},
    ],
  },
}

const isPageKey = (value: string | undefined): value is PageKey => value === 'about' || value === 'process' || value === 'contact'

export function PageContentManager() {
  const { page: pageParam } = useParams()
  const page: PageKey = isPageKey(pageParam) ? pageParam : 'about'
  const config = pageEditorConfig[page]
  const [form,setForm] = useState<EditablePageContent>(()=>getPageContent(page))
  const [saved,setSaved] = useState(false)
  const [saveError,setSaveError] = useState('')
  useEffect(()=>{let active=true;fetchPageContent(page).then((remote)=>{if(active&&remote)setForm(remote)}).catch(()=>undefined);return()=>{active=false}},[page])
  const update = (name:PageField['name'],value:string)=>{setSaved(false);setForm((current)=>({...current,[name]:value}))}
  const updateSection = (id:string,patch:Partial<EditablePageSection>)=>{setSaved(false);setForm((current)=>({...current,sections:current.sections.map((section)=>section.id===id?{...section,...patch}:section)}))}
  const addSection = ()=>{const section:EditablePageSection={id:crypto.randomUUID(),eyebrow:'',title:page==='process'?'New step':'New section',body:'',image:'',linkLabel:'',linkUrl:''};setSaved(false);setForm((current)=>({...current,sections:[...current.sections,section]}))}
  const removeSection = (id:string)=>{setSaved(false);setForm((current)=>({...current,sections:current.sections.filter((section)=>section.id!==id)}))}
  const moveSection = (index:number,direction:number)=>{const target=index+direction;if(target<0||target>=form.sections.length)return;const sections=[...form.sections];[sections[index],sections[target]]=[sections[target],sections[index]];setSaved(false);setForm({...form,sections})}
  const save = async(event:FormEvent)=>{event.preventDefault();setSaveError('');try{await savePageContent(page,form);setSaved(true)}catch{setSaved(false);setSaveError('Saved on this device, but the database could not be reached. Start the API server and save again.')}}

  if(!isPageKey(pageParam))return <div className="cms-page"><EmptyState title="Page not found" copy="Choose About, Process or Contact from the dashboard navigation." to="#"/></div>

  return <div className="cms-page">
    <PageHeader eyebrow="Website pages" title={config.title} copy="Edit the page content and manage its repeatable sections." action={<Link className="cms-secondary-button" to={`/${page}`} target="_blank"><Eye/> View page</Link>}/>
    {saved&&<div className="cms-success">{config.title} saved successfully.</div>}
    {saveError&&<div className="cms-page-save-error" role="alert">{saveError}</div>}
    <form className="cms-homepage-form" onSubmit={save}>
      <section className="cms-panel">
        <div className="cms-panel-head"><div><p className="cms-kicker">Main content</p><h2>Page introduction</h2></div></div>
        <div className="cms-form-grid">{config.fields.map((field)=><label className={`cms-field ${field.type==='textarea'?'is-wide':''}`} key={field.name}><span>{field.label}</span>{field.type==='textarea'?<textarea rows={4} value={String(form[field.name])} onChange={(event)=>update(field.name,event.target.value)}/>:<input type={field.type||'text'} value={String(form[field.name])} onChange={(event)=>update(field.name,event.target.value)}/>}</label>)}</div>
      </section>
      <section className="cms-panel">
        <div className="cms-panel-head"><div><p className="cms-kicker">Repeatable content</p><h2>{config.sectionTitle}</h2></div><button className="cms-secondary-button" type="button" onClick={addSection}><Plus/>{config.addLabel}</button></div>
        {form.sections.length?<div className="cms-page-section-list">{form.sections.map((section,index)=><article className="cms-page-section-editor" key={section.id}>
          <header><div><span>{page==='process'?'Step':'Section'} {String(index+1).padStart(2,'0')}</span><strong>{section.title||'Untitled'}</strong></div><div><button type="button" onClick={()=>moveSection(index,-1)} disabled={index===0} aria-label="Move up"><ArrowUp/></button><button type="button" onClick={()=>moveSection(index,1)} disabled={index===form.sections.length-1} aria-label="Move down"><ArrowDown/></button><button type="button" className="is-danger" onClick={()=>removeSection(section.id)} aria-label="Delete section"><Trash2/></button></div></header>
          <div className="cms-form-grid">
            {page!=='process'&&<label className="cms-field"><span>Eyebrow</span><input value={section.eyebrow} onChange={(event)=>updateSection(section.id,{eyebrow:event.target.value})}/></label>}
            <label className="cms-field"><span>{page==='process'?'Step title':'Section title'}</span><input required value={section.title} onChange={(event)=>updateSection(section.id,{title:event.target.value})}/></label>
            <label className="cms-field is-wide"><span>Description</span><textarea rows={4} value={section.body} onChange={(event)=>updateSection(section.id,{body:event.target.value})}/></label>
            {page!=='process'&&<><div className="cms-field is-wide"><ImageUploader label="Section Image" multiple={false} value={section.image} onChange={(value)=>updateSection(section.id,{image:String(value)})}/></div><label className="cms-field"><span>Link label</span><input value={section.linkLabel} onChange={(event)=>updateSection(section.id,{linkLabel:event.target.value})}/></label><label className="cms-field"><span>Link URL</span><input value={section.linkUrl} onChange={(event)=>updateSection(section.id,{linkUrl:event.target.value})}/></label></>}
          </div>
        </article>)}</div>:<div className="cms-page-sections-empty"><p>{page==='process'?'Add the first process step.':'No additional sections. Add one when this page needs more content.'}</p></div>}
      </section>
      <div className="cms-page-save"><button className="cms-primary-button" type="submit">Save {config.title}</button></div>
    </form>
  </div>
}

export function HomepageManager() {
  const initial=useMemo(()=>({heroHeading:'Ideas with clarity. Built for impact.',heroDescription:'We turn ambitious ideas into memorable brands, films and digital experiences.',primaryButton:'Explore our work',secondaryButton:'View services',heroImage:'',heroVideo:'',aboutHeading:'We bridge the gap between brands and modern digital experiences.',aboutDescription:'Unseen Studios unites strategy, filmmaking, design, technology and growth so every idea moves with one clear direction.',aboutImage:'',aboutCta:'Discover our story',projects:'100+',clients:'45+',years:'7+',awards:'11',founderName:'Govind Budhwant',founderRole:'Founder & Creative Director',founderBio:'Govind founded Unseen Studios to build a more thoughtful kind of creative partner—close to the business, curious about the audience and uncompromising about the craft.',founderImage:'',featuredProjects:'',featuredTestimonials:'',featuredServices:'',ctaHeading:'Have a project in mind?',ctaDescription:'Let’s make it unmissable.',ctaButton:'Start a conversation',ctaLink:'/contact'}),[])
  const [form,setForm]=useState<Record<string,string>>(()=>({...initial,...cmsService.get<Partial<Record<string,string>>>('homepage',initial)})),[saved,setSaved]=useState(false)
  const sections=[['Hero',['heroHeading','heroDescription','primaryButton','secondaryButton','heroVideo']],['Who we are',['aboutHeading','aboutDescription','aboutCta']],['Statistics',['projects','clients','years','awards']],['Founder',['founderName','founderRole','founderBio']],['Featured content',['featuredProjects','featuredTestimonials','featuredServices']],['Call to action',['ctaHeading','ctaDescription','ctaButton','ctaLink']]] as const
  const labels:Record<string,string>={heroHeading:'Hero Heading',heroDescription:'Hero Description',primaryButton:'Primary Button',secondaryButton:'Secondary Button',heroVideo:'Hero Video URL',aboutHeading:'Who We Are Heading',aboutDescription:'Who We Are Description',aboutCta:'About Link Text',projects:'Projects',clients:'Clients',years:'Years',awards:'Creative Disciplines',founderName:'Founder Name',founderRole:'Founder Title',founderBio:'Founder Story',featuredProjects:'Featured Project IDs',featuredTestimonials:'Featured Testimonial IDs',featuredServices:'Service Order / IDs',ctaHeading:'Heading',ctaDescription:'Description',ctaButton:'Button Text',ctaLink:'Button Link'}
  useEffect(()=>{
    let active=true
    const migrationKey='unseen-cms-server-migrated-homepage'
    const hasLocal=localStorage.getItem('unseen-cms-homepage')!==null
    const localValue={...initial,...cmsService.get<Partial<Record<string,string>>>('homepage',initial)}
    cmsService.syncValue<Partial<Record<string,string>>>('homepage').then(async(remote)=>{
      if(remote){if(active)setForm({...initial,...remote})}
      else if(hasLocal&&!localStorage.getItem(migrationKey)){await cmsService.setRemote('homepage',localValue);if(active)setForm(localValue)}
      localStorage.setItem(migrationKey,'1')
    }).catch(()=>{if(active)setForm(localValue)})
    return()=>{active=false}
  },[initial])
  return <div className="cms-page"><PageHeader eyebrow="Website" title="Homepage Content" copy="Manage homepage messaging, studio story, founder information and featured content."/>{saved&&<div className="cms-success">Homepage content saved successfully. The public homepage will use these updates immediately.</div>}<form className="cms-homepage-form" onSubmit={(e)=>{e.preventDefault();void cmsService.setRemote('homepage',form).catch(()=>undefined);setSaved(true)}}><section className="cms-panel"><div className="cms-panel-head"><h2>Homepage media</h2></div><div className="cms-form-grid"><ImageUploader label="Hero Image" multiple={false} value={form.heroImage} onChange={(value)=>setForm({...form,heroImage:String(value)})}/><ImageUploader label="Studio / About Image" multiple={false} value={form.aboutImage} onChange={(value)=>setForm({...form,aboutImage:String(value)})}/><ImageUploader label="Founder Portrait" multiple={false} value={form.founderImage} onChange={(value)=>setForm({...form,founderImage:String(value)})}/></div></section>{sections.map(([title,fields])=><section className="cms-panel" key={title}><div className="cms-panel-head"><h2>{title}</h2></div><div className="cms-form-grid">{fields.map((field)=><label className={`cms-field ${field.toLowerCase().includes('description')||field==='founderBio'?'is-wide':''}`} key={field}><span>{labels[field]}</span>{field.toLowerCase().includes('description')||field==='founderBio'?<textarea rows={4} value={form[field]} onChange={(e)=>setForm({...form,[field]:e.target.value})}/>:<input value={form[field]} onChange={(e)=>setForm({...form,[field]:e.target.value})}/>}</label>)}</div></section>)}<button className="cms-primary-button" type="submit">Save homepage</button></form></div>
}

export function SettingsManager() {
  const defaults={studioName:'Unseen Studios',email:'hello.trijjamedia@gmail.com',phone:'+91 77098 14062',location:'Pune, Maharashtra 411068'}
  const [form,setForm]=useState(()=>cmsService.get('settings',defaults)),[saved,setSaved]=useState(false)
  const fields=[['studioName','Studio Name'],['email','Contact Email'],['phone','Phone'],['location','Location']] as const
  return <div className="cms-page"><PageHeader eyebrow="Website" title="Settings" copy="Core studio contact and publishing preferences."/>{saved&&<div className="cms-success">Settings saved successfully.</div>}<form className="cms-panel" onSubmit={(event)=>{event.preventDefault();cmsService.set('settings',form);setSaved(true)}}><div className="cms-form-grid">{fields.map(([name,label])=><label className="cms-field" key={name}><span>{label}</span><input value={form[name]} onChange={(event)=>setForm({...form,[name]:event.target.value})}/></label>)}</div><button className="cms-primary-button" type="submit">Save settings</button></form></div>
}
